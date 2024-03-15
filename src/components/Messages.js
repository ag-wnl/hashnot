import React, { useEffect, useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import send_dm from "../imgs/send_msg.svg"
import { Alert, AlertIcon, Button, Input    } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Messages = ({postId, postOwnerId, postTitle}) => {

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
    const [desc, setDesc] = useState("");
    const [notification, setNotification] = useState();
    

    const handleClick = async (e) => {  
        const chatMessage = `Request to join: ${postTitle}. Request Message: ` + desc;
        try {
            await Promise.all([
                axios.post(`http://localhost:8800/api/messages`, { desc, postId, userId, postOwnerId }),
                axios.post(`http://localhost:8800/api/chats`, { message: chatMessage, postId, userId, sendToUser : postOwnerId })
            ]);
    
            setDesc("");
            setNotification('success');
        } catch (err) {
            console.log(err);
            setNotification('failed');
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

                {notification &&
                notification === 'success' ?
                <Alert status='success' variant='left-accent' style={{marginTop:'20px'}}>
                    <AlertIcon />
                    Request sent
                </Alert>

                :
                notification === 'failed' &&
                <Alert status='error' variant='left-accent' style={{marginTop:'20px'}}>
                    <AlertIcon />
                    Failed to send request
                </Alert>                                
                }
                
            </div>
        </>
    )
}

export default Messages