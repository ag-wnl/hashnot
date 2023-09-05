import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Posts() {
  return (
    <>
        <div class = 'post-container'>
            <div class = 'post-header'>
                <span>PfP</span>
                <h3>This is the post Header</h3>
            </div>
            <div>This is the post description. This will contain the information about the post, team formation etc. This is where the user can read a summary about what the OP is trying to say.</div>

            <button class = 'login-btn'>Interested</button>
        </div>
        
    </>
  )
}

export default Posts