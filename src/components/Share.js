import React from 'react'
import { useContext, useState } from "react";
import '../components/component.css';
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import post_img from "../imgs/post_img.svg"

function Share() {
    const { currentUser } = useContext(AuthContext);
    var pfp = userimg;
    if(currentUser.profilePic) {
        pfp = "/upload/" + currentUser.profilePic;
    }
    return (
        <>
            <div class = 'share-card'>
                <div class = 'share-card-header'>
                    <img class = 'pfp' src={pfp} alt="" />
                    <span>test</span>
                </div>
                <input
                type="text"
                placeholder={`The post title goes here ${currentUser.username}!`}
                // onChange={(e) => setDesc(e.target.value)}
                // value={desc}
                />
                <input
                type="text"
                placeholder={`Describe your excitement here! ${currentUser.name}`}
                // onChange={(e) => setDesc(e.target.value)}
                // value={desc}
                />
                <div class = 'share-bottom-bar'>
                    <span><img class = 'pfp' src={post_img} /></span>
                    <span>@</span>
                </div>
            </div>
        </>
    )
}

export default Share