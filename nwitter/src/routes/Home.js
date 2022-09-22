import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
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
        //document 생성
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("");
    };
    const onChange = (event) => {
        setNweet(event.target.value);
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind" maxLength={120}/>
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map((nweet) => <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>)}
        </div>
    </div>)
}

export default Home;