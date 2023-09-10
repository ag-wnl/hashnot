import React, { useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import Messages from './Messages';
import userimg from "../imgs/user.png"
import upvote from "../imgs/up.svg"
import { Link } from 'react-router-dom';

function Post({ post }) {

    const { currentUser } = useContext(AuthContext);

    const [chat, setChat] = useState(false);

    //fetching upvotes 
    const { isLoading, error, data } = useQuery(["upvotes", post.id], () =>
        makeRequest.get("/upvotes?postId=" + post.id).then((res) => {
        return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (voted) => {
            if (voted) return makeRequest.delete("/upvotes?postId=" + post.id);
            return makeRequest.post("/upvotes", { postId: post.id });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["upvotes"]);
        },
        }
    );

    const deleteMutation = useMutation(
        (postId) => {
          return makeRequest.delete("/posts/" + postId);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
    );

    const handleVote = () => {
        mutation.mutate(data.includes(currentUser.id));
    };
    
    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    return (
        <>
        <div class = 'post-box'>
            <div class = 'post-container'>
                <div class = 'post-header'>
                    
                        
                    {post.pfp ?
                                <Link to={`/profile/${post.username}`}> 
                                <img 
                                style={{width:'40px',height:'40px',borderRadius:'12px'}} 
                                src={post.pfp} /></Link>
                                :
                                <Link to={`/profile/${post.username}`}> 
                                <img 
                                style={{width:'40px',height:'40px',borderRadius:'12px'}} 
                                src={userimg} /></Link>
                                }
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
                </div>
                
                <div class = 'skills'>
                    <span>Skills: React, Tailwind, Node.js</span>
                </div>

                <div class = 'post-bottom-line'>
                    <button class = 'post-bottom-btn'>Interested</button>
                    <button class = 'post-bottom-btn' onClick={() => setChat(!chat)}>Chat</button>
    
                    {/* Upvote Icon */}
                    {isLoading ? ('Loading...') 
                    : data.includes(currentUser.id) ? (
                        <svg 
                        onClick={handleVote}
                        style={{cursor:'pointer'}}
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        enableBackground="new 0 0 512 512"
                        xmlSpace="preserve"
                        width="25"
                        height="25"
                        >
                        {/* SVG path data */}
                        <polygon fill="#8ff76f" points="256,10 106,210 186,210 186,366 326,366 326,210 406,210" />
                        <g>
                            <rect x="186" y="394" fill="#7aeb57" width="140" height="40"/>
                        </g>
                        <g>
                            <rect x="186" y="462" fill="#62de3c" width="140" height="40"/>
                        </g>
                        </svg>
                    ) : (
                        <svg 
                        onClick={handleVote}
                        style={{cursor:'pointer'}}
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        enableBackground="new 0 0 512 512"
                        xmlSpace="preserve"
                        width="25"
                        height="25"
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
                    )
                        
                    }
                    {data?.length} Upvotes
                </div>
                {
                    chat && <Messages postId={post.id} /> 
                }
            </div>
        </div>
        </>
    )
}

export default Post