import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar';
import '../components/component.css'


function Account() {

    const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

    //fetching user data from backend:


    return (
        <>
        
            <Navbar />
            <div class = 'account-head'>
                <h1>Account</h1>
                <p>Hi {user.name}! Hope you're doing amazing. You can check out your account settings over here</p>

                <div class = 'user-card'>
                    <div class = 'user-card-row'>
                        <img src={user.picture} alt={user.name} class = 'card-pfp' />
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.nickname}</span>
                    </div>
                </div>
                <button 
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    class = 'login-btn'>Logout
                </button>

            </div>
        </>
    );
}

export default Account;