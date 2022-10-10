import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = ({ refreshUser , userObj }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMyNweets = async() => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId","==", userObj.uid)
        .orderBy("createdAt")
        .get();
    };
    useEffect(() => {
        getMyNweets();
    });
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (event) => {
        setNewDisplayName(event.target.value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    return(
        <>
            <div className={styles.container}>
                <form onSubmit={onSubmit} className={styles.profileForm}>
                    <input 
                        onChange={onChange} 
                        type="text" 
                        placeholder="Display name" 
                        value={newDisplayName}
                        className={styles.formInput}
                        />
                    <input 
                        type="submit" 
                        value="Update Profile"
                        className={styles.formBtn}
                        />
                </form>
                <span
                    className={`${styles.formBtn} ${styles.cancelBtn} ${styles.logOut}`} 
                    onClick={onLogOutClick}>Log Out</span>
            </div>
        </>
    );
};

export default Profile;

