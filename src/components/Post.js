import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import Messages from './Messages';
import userimg from "../imgs/user.png"

function Post({ post }) {

    const { currentUser } = useContext(AuthContext);
    // const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    //     makeRequest.get("/likes?postId=" + post.id).then((res) => {
    //     return res.data;
    //     })
    // );

    const queryClient = useQueryClient();

    var user_pfp = userimg;
    if(currentUser.pfp) {
        user_pfp = "/upload/" + currentUser.pfp;
    }

    return (
        <>
            <div class = 'post-container'>
                <div class = 'post-header'>
                    <img class = 'pfp' src={user_pfp} alt="" />
                    <h3>{post.title} post of {post.name}</h3>
                    <span>{moment(post.createdAt).fromNow()}</span>
                </div>
                <div>
                    {post.desc}
                    post id: {post.id}
                </div>

                <button class = 'login-btn'>Interested</button>
                <Messages postId={post.id} />

            </div>
        </>
    )
}

export default Post