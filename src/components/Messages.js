import React, { useEffect, useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient, useQuery  } from 'react-query';
import userimg from "../imgs/user.png"
import send_dm from "../imgs/send_msg.svg"

import { makeRequest } from "../axios";
import MessageBox from './MessageBox';
import { Button, Input } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Messages = ({postId, postOwnerId}) => {

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
    const [desc, setDesc] = useState("");
    const [data, setRequestData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // const { isLoading, error, data } = useQuery(['messages', postId], () =>
    // makeRequest.get("/messages?postId=" + postId).then((res) => {
    //     return res.data;
    //     })
    // ); 
    
    useEffect(() => {
        setIsLoading(true);
        const getMessages = async() => {
            try {
                axios.get(`http://localhost:8800/api/messages?postId=${postId}`)
                .then((response) => {
                    setRequestData(response.data);
                    setIsLoading(false);
                })
            } catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        }

        getMessages();
    }, [postId])


    const handleClick = async (e) => {  
        // axios.post(`http://localhost:8800/api/messages`, { desc, postId, userId, postOwnerId })
        // .then(() => {
        //     setDesc("");
        // })
        try {
            await Promise.all([
                axios.post(`http://localhost:8800/api/messages`, { desc, postId, userId, postOwnerId }),
                axios.post(`http://localhost:8800/api/chats`, { message: desc, postId, userId, sendToUser : postOwnerId })
            ]);
    
            setDesc("");
        } catch (err) {
            console.log(err);
        }
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
                    <Input
                    type="text"
                    placeholder="Send a request message"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    />

                    <Button rightIcon={<CheckIcon />} 
                    style={{padding:'2px 20px 2px 20px'}}
                    onClick={handleClick} src={send_dm}
                    variant='outline'>
                        Send
                    </Button>

                </div>
                {isLoading
                ? "Loading..."
                : data && data.map((message) => (
                    <MessageBox pfp = {(message.pfp ? message.pfp : user_pfp)} senderName={message.name} createdAt={message.createdAt} messageString={message.desc} />
                ))}
            </div>
        </>
    )
}

export default Messages