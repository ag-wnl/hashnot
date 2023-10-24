import React, { useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient, useQuery  } from 'react-query';
import userimg from "../imgs/user.png"
import send_dm from "../imgs/send_msg.svg"

import { makeRequest } from "../axios";
import moment from 'moment';
import MessageBox from './MessageBox';

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
        user_pfp = currentUser.pfp;
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
                    <MessageBox pfp = {(message.pfp ? message.pfp : user_pfp)} senderName={message.name} createdAt={message.createdAt} messageString={message.desc} />
                ))}
            </div>
        </>
    )
}

export default Messages