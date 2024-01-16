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
import LinkPreview from './LinkPreview';
const extractUrls = require("extract-urls");

function Post({ post }) {

    const { currentUser } = useContext(AuthContext);

    const [chat, setChat] = useState(false);

    //checking is post description contains URLs:
    const urls = extractUrls(post.desc, true);
    const firstURL = urls && urls.length > 0 ? urls[0] : '';

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

                {/* The post upper panel section: pfp, username, options etc */}
                <div class = 'post-header'>
                    <div class='post-header-left'>
                        {post.pfp ?
                                    <Link to={`/profile/${post.username}`}> 
                                    <img 
                                    style={{width:'40px',height:'40px',borderRadius:'50%'}} 
                                    src={post.pfp} /></Link>
                                    :
                                    <Link to={`/profile/${post.username}`}> 
                                    <img 
                                    style={{width:'40px',height:'40px',borderRadius:'50%'}} 
                                    src={userimg} /></Link>
                                    }
                        <span>{post.name}</span>
                        
                        <div class = 'post-header-subtle'>
                            <span >@{post.username}</span>
                            <span>•</span>
                            <span
                            style={{fontSize:'12px'}}
                            >{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>    
                    
                    <div class = 'three-dot-container'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="post-threedots"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                    </div>    
                </div>

                {/* Post information section: heading onwards */}
                <span style={{fontSize:'18px', color:"#e0deff"}}>{post.title}</span>

                <div style={{fontSize:'14px'}}>
                    {post.desc}
                </div>
                
                {/* Displaying url preview: */}
                {
                    (firstURL !== "" && 
                    <div>
                        <LinkPreview url={firstURL}/>
                    </div>
                    )
                }
                

                {/* The skills and Domains section of the post  */}
                <div style={{fontSize:'12px', display:'flex', flexDirection:'column', gap:'10px', color:'#8fb3ff'}}>

                    <span style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center'}}>
                        Skills : 
                        {post.skills ? 
                        (post.skills.split(',').map((skill, index) => (
                            <span class = 'post-skills' key={index}> {skill}</span>
                        ))
                        ) : (
                            <span class='post-skills'> No specific skill</span>
                        )}
                    </span>

                    <span style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center'}}>
                        Domains:
                        {post.domain ? 
                        (post.domain.split(',').map((currDomain, index) => (
                            <span class = 'post-skills' key={index}> {currDomain}</span>
                        ))) : (
                            <span class='post-skills'> No specific domain</span>
                        )}
                    </span>
                </div>

                {/* Bottom panel of the post */}
                <div class = 'post-bottom-line'>
                    <span
                    style={{color:'#8fb3ff', cursor:'pointer'}}
                    >Team Size: {post.team_size}</span>

                    <span
                    style={{color:'#8fb3ff', cursor:'pointer'}}
                    >Purpose: {post.objective}</span>

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
                        width="20"
                        height="20"
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
                        width="20"
                        height="20"
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
                    )}
                    {data?.length} Upvotes

                    {(post.userId === currentUser.id) 
                    && <button title='Delete Post' onClick={handleDelete} style={{backgroundColor:'#8f1818'}} class = 'post-bottom-btn'>Delete</button>}
                    
                </div>

                {/* This is the chat section of the post */}
                {
                    chat && <Messages postId={post.id} /> 
                }
            </div>
        </div>
        </>
    )
}

export default Post