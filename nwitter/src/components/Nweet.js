import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
           text: newNweet 
        });
        setEditing(false);
    }
    const onChange = (event) => {
        setNewNweet(event.target.value);
    }
    return (
        <div>
            {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={onChange}
                        value={newNweet} 
                        type="text"
                        placeholder="Edit your nweet" 
                        required/>
                        <input type="submit" value="Update Nweet"/>
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
            ):(
                
            <div key={nweetObj.id}>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
                )}
            </div>
            )}
        </div>
    );
};

export default Nweet;