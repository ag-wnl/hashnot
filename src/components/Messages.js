import React, { useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient, useQuery  } from 'react-query';
import userimg from "../imgs/user.png"
import send_dm from "../imgs/send_msg.svg"

import { makeRequest } from "../axios";
import moment from 'moment';

const Messages = ({postId}) => {

    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");

    const { isLoading, error, data } = useQuery(['messages', postId], () =>
    makeRequest.get("/messages?postId=" + postId).then((res) => {
        return res.data;
        })
    );  

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newMessage) => {
        return makeRequest.post("/messages", newMessage);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["messages"]);
        },
      }
    );

    const handleClick = async (e) => {  
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    var user_pfp = userimg;
    if(currentUser.pfp) {
        user_pfp = "/upload/" + currentUser.pfp;
    }

    return (
        <>
            <div>
                <div className="message-write">
                    <img 
                    class = 'pfp'
                    src={user_pfp} alt="" />
                    <input
                    type="text"
                    placeholder="Send a request message"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    />
                    <img
                    style={{width:'25px', cursor:'pointer'}} 
                    onClick={handleClick} src={send_dm} />
                </div>
                {error
                ? "Something went wrong"
                : isLoading
                ? "loading"
                : data.map((message) => (
                    <div className="message">
                        
                        <div className="msg-info">
                            
                            <div style={{display:'flex', gap:'0.7rem'}}>
                                <img 
                                class = 'msg-pfp'
                                src={(message.pfp ? "/upload/" + message.pfp : user_pfp)} alt="" />
                                <span style={{fontSize:'14px', fontWeight:'700'}}>{message.name}</span>
                            </div>

                            <span style={{fontSize:'10px'}} className="date">
                            {moment(message.createdAt).fromNow()}
                            </span>
                        </div>
                        
                        <p style={{fontSize:'16px'}}>{message.desc}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Messages