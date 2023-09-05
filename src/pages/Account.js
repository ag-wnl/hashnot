import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import Navbar from '../components/Navbar';
import '../components/component.css'
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Account() {


    //fetching user info
    const { currentUser } = useContext(AuthContext);


    return (
        <>
        
            <Navbar />
            <div class = 'account-head'>
                <h1>Account</h1>
                <p>Hi <b>{currentUser.name}</b> Hope you're doing amazing. You can check out your account settings over here</p>

                <div class = 'user-card'>
                    <div class = 'user-card-row'>
                        <img src={"/upload/" + currentUser.profilePic} alt={currentUser.name} class = 'card-pfp' />
                        <span>{currentUser.username}</span>
                        <span>{currentUser.email}</span>
                    </div>
                </div>
                <button 
                    class = 'login-btn'>Logout
                </button>

            </div>
        </>
    );
}

export default Account;