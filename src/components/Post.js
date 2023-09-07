import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import Messages from './Messages';

function Post({ post }) {

    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
        })
    );

    const queryClient = useQueryClient();


    return (
        <>
            <div class = 'post-container'>
                <div class = 'post-header'>
                    <img src={"/upload/"+post.pfp} alt="" />
                    <h3>{post.title} post of {post.name}</h3>
                    <span>{moment(post.createdAt).fromNow()}</span>
                </div>
                <div>
                    {post.desc}
                    <img src={"/upload/" + post.img} alt="" />
                </div>

                <button class = 'login-btn'>Interested</button>
                <Messages postId={post.id} />
            </div>
        </>
    )
}

export default Post