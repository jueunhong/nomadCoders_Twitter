import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";
import { storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
        }, []);

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
    <div>
        <form onSubmit={onSubmit}>
            <input 
                onChange={onChange}
                value={nweet}
                type="text"
                placeholder="What's on your mind" 
                maxLength={120}/>
            <input
                onChange={onFileChange}
                type="file"
                accept="image/*" />
            <input type="submit" value="Nweet" />
            {attachment && (
            <div>
                <img src={attachment} width="50px" alt=""/>
                <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
        <div>
            {nweets.map((nweet) => <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>)}
        </div>
    </div>)
}

export default Home;