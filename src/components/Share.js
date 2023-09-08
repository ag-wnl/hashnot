import React from 'react'
import { useContext, useState } from "react";
import '../components/component.css';
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import post_img from "../imgs/post_img.svg"
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from "../axios";

function Share() {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

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
        mutation.mutate({title, desc})
    }

    var pfp = userimg;
    if(currentUser.pfp) {
        pfp = "/upload/" + currentUser.pfp;
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
                onChange={(e) => setTitle(e.target.value)}
                // value={desc}
                />
                <input
                type="text"
                placeholder={`Describe your excitement here! ${currentUser.name}`}
                onChange={(e) => setDesc(e.target.value)}
                // value={desc}
                />

                <div class = 'share-bottom-bar'>
                    <input type = "file" 
                        style={{display: "none"}}
                        onChange={(e) => setTitle(e.target.files[0])}
                    />
                    <span title='Add Image'>
                        <img class = 'pfp' src={post_img} />
                    </span>
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