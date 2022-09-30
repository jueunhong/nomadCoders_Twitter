import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
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
    })
    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;

