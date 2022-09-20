import { dbService } from "fbase";
import React from "react";
import { useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        //document 생성
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now()
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
    </div>)
}

export default Home;