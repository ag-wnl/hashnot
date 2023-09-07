import React from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import Post from '../components/Post';
import Posts from '../components/Posts';
import Invites from '../components/Invites';

function Profile() {

    const { currentUser } = useContext(AuthContext);

    var pfp = userimg;
    if(currentUser.profilePic) {
        pfp = "/upload/" + currentUser.profilePic;
    }

    return (
        <>
            <Navbar />
            <div class = 'profile-page'>
                <div class = 'profile-header'>
                    <h1>Your Account</h1>
                </div>
                <div class = 'profile-card'>
                    <div class = 'profile-row'>
                        <img 
                        style={{width:'50px',height:'50px',borderRadius:'12px'}} 
                        src={pfp} />
                        <h3>{currentUser.username}</h3>
                    </div>
                    <div class = 'profile-row'>
                        <span>{currentUser.name}</span>
                    </div>
                </div>
                <Invites />
                <Posts />
            </div>
        </>
    )
}

export default Profile;