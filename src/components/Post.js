import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import Messages from './Messages';
import userimg from "../imgs/user.png"
import upvote from "../imgs/up.svg"

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
        <div class = 'post-box'>
            <div class = 'post-container'>
                <div class = 'post-header'>
                    <img class = 'pfp' src={user_pfp} alt="" />
                    <span>•</span>
                    <span>{post.name}</span>
                    <span>•</span>
                    <span
                    style={{fontSize:'12px'}}
                    >{moment(post.createdAt).fromNow()}</span>
                </div>
                <span style={{fontSize:'18px'}}><b>{post.title}</b></span>
                <div>
                    {post.desc}
                    post id: {post.id}
                </div>
                <div class = 'post-bottom-line'>
                    <button class = 'post-bottom-btn'>Interested</button>
                    <button class = 'post-bottom-btn'>Chat</button>

                    <svg 
                            style={{cursor:'pointer'}}
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            enableBackground="new 0 0 512 512"
                            xmlSpace="preserve"
                            width="30"
                            height="30"
                        >
                            {/* SVG path data */}
                            <polygon fill="#4a4a4a" points="256,10 106,210 186,210 186,366 326,366 326,210 406,210" />
                            <g>
                                <rect x="186" y="394" fill="#383838" width="140" height="40"/>
                            </g>
                            <g>
                                <rect x="186" y="462" fill="#262626" width="140" height="40"/>
                            </g>
                    </svg>
                </div>
                
                <Messages postId={post.id} />

            </div>
        </div>
        </>
    )
}

export default Post