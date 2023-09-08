import React from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import git_img from "../imgs/github.svg"
import website_img from "../imgs/link.svg"
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
                            style={{width:'70px',height:'70px',borderRadius:'12px'}} 
                            src={pfp} />
                            <h3>{currentUser.username}</h3>
                        </div>
                        <div class = 'profile-row'>
                            <span>{currentUser.name}</span>
                        </div>
                        {(currentUser.about) && <span>{currentUser.about}</span>}
                        <div class = 'profile-links'>
                            {(currentUser.github) &&
                            <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                <img 
                                style={{width:'20px'}}
                                src={git_img} />
                                <b>Github: </b>{currentUser.github}</span>
                            }
                            {(currentUser.website) &&
                            <span  style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                <img
                                style={{width:'20px'}}
                                src={website_img} />
                                <b>Website: </b>{currentUser.website}</span>
                            }
                        </div>
                    </div>

                    <div class = 'other-utils'>
                        <h3>Showcase</h3>
                        <div class = 'showcase'>
                            #1 in Google Kickstart 2040, Won Facebook HackerCup
                        </div>
                        <span style={{fontSize:'14px'}}><b>Skills: </b>C++, JavaScript, Data Science, Databases</span>
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