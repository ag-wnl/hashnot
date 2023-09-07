import React from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import Post from '../components/Post';
import Posts from '../components/Posts';
import Invites from '../components/Invites';
import chat_img from "../imgs/chat.png"
import team_img from "../imgs/team.png"

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
                <div class = 'profile-cards-row'>
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
                        {(currentUser.about) && <span>{currentUser.about}</span>}
                        <div class = 'profile-links'>
                            {(currentUser.github) &&
                            <span>Github: {currentUser.github}</span>
                            }
                            {(currentUser.website) &&
                            <span>Website: {currentUser.website}</span>
                            }
                        </div>
                    </div>

                    <div class = 'other-utils'>
                        <span>Followed By: 10</span>
                        <div class = 'profile-row'>
                            <img 
                            title='View Teams'
                            style={{width:'30px', cursor:'pointer'}}
                            src = {team_img} />
                            <img 
                            title='View Chats'
                            style={{width:'20px', cursor:'pointer'}}
                            src = {chat_img} />
                        </div>
                    </div>
                </div>
        
                <Invites />
                <Posts />
            </div>
        </>
    )
}

export default Profile;