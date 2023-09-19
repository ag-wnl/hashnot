import React from 'react'
import { useContext, useState } from "react";
import '../components/component.css';
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from "../axios";

function Share() {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [skills, setSkills] = useState("")

    const mutation = useMutation(
        (newPost) => {
          return makeRequest.post("/posts", newPost);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
    );

    const handleClick = e => {
        e.preventDefault()
        mutation.mutate({title, desc, skills})
    }

    var user_pfp = userimg;
    if(currentUser.pfp) {
        user_pfp = currentUser.pfp;
    }

    return (
        <>
            <div class = 'share-card'>
                <div class = 'share-card-header'>
                    <img class = 'pfp' src={user_pfp} alt="" />
                    <span>{currentUser.username}</span>
                </div>
                
                <div class = 'post-inp-area'>
                    <input
                    class = 'create-post-title'
                    type="text"
                    placeholder={`Type your amazing post Title here!`}
                    onChange={(e) => setTitle(e.target.value)}
                    // value={desc}
                    />
                    <textarea
                    rows="5" 
                    class = 'create-post-desc'
                    type="text"
                    placeholder={`The Post description goes here!`}
                    onChange={(e) => setDesc(e.target.value)}
                    // value={desc}
                    />
                    <input
                    class = 'create-post-skills'
                    type="text"
                    placeholder={`Mention desired skills, seperated by ;`}
                    onChange={(e) => setSkills(e.target.value)}
                    // value={desc}
                    />
                </div>

                <div class = 'share-bottom-bar'>
                    <input type = "file" 
                        style={{display: "none"}}
                        onChange={(e) => setTitle(e.target.files[0])}
                    />
                    <span title='Tag Users'>@</span>
                    <button class = 'green-btn'
                    onClick={handleClick}
                    >Share Post</button>
                </div>
            </div>
        </>
    )
}

export default Share