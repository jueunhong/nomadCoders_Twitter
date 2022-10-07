import React, { useState }from "react";
import { storageService } from "fbase";
import { dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./NweetFactory.module.css"


const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        //attachment가 없을 수도 있음
        let attachmentUrl = "";
        
        if(attachment !==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl= await response.ref.getDownloadURL();
            };
            
            const nweetData = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl
            };
            //document 생성
            await dbService.collection("nweets").add(nweetData);
            setNweet("");
            setAttachment("");
        };
    const onChange = (event) => {
        setNweet(event.target.value);
    };
    const onFileChange = (event) => {
        const theFile = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            setAttachment(finishedEvent.target.result);
        }
        reader.readAsDataURL(theFile);
    };//이미지 파일 읽기
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className={styles.factoryForm}>
            <div className={styles.factoryInput_container}>
                <input 
                    className={styles.factoryInput_input}
                    onChange={onChange}
                    value={nweet}
                    type="text"
                    placeholder="What's on your mind" 
                    maxLength={120}/>
                <input type="submit" value="&rarr;" className={styles.facoryInput_arrow} />
            </div>
            <label htmlFor="attach-file" className={styles.factoryInput_label}>
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input
                id="attach-file"
                onChange={onFileChange}
                type="file"
                accept="image/*"
                style={{
                    opacity: 0,
                  }} />
            
            {attachment && (
            <div className={styles.fatoryForm_attachment}>
                <img 
                    src={attachment}
                    style={{
                        backgroundImage: attachment,
                      }}
                    alt=""/>
                <div className={styles.factoryForm_clear} onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
            )}
        </form>
    )
};

export default NweetFactory;