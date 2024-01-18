import React, { useEffect, useState } from 'react'
import '../App.css';
import Navbar from '../components/Navbar'
import ChatPreview from '../components/ChatPreview';
import { StreamChat } from 'stream-chat';
import {Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator} from "stream-chat-react"
import 'stream-chat-react/dist/css/index.css'
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import IndividualRequestsPanel from '../components/IndividualRequestsPanel';
import RequestPreview from '../components/RequestPreview';

const API_KEY = process.env.REACT_APP_STREAM_CHAT_API_KEY;


function Chats() {
    const location = useLocation();
    const chatData = location.state?.chatData;
    const userId = chatData?.userId;
    console.log(userId);
    const { isLoading: postRequestLoading , error, data: postRequestData } = useQuery({
        queryKey: ['userId', userId],
        queryFn: () => makeRequest.get('/showrequest?userId=' + userId).then(res => {
            return res.data;
        }),
        enabled : !!userId,
    });

    
    // Handling Focused and Other message button Switch
    const [showRequests, setshowRequests] = useState(true);
    const [showMessages, setshowMessages] = useState(true);

    const FocusedButtonClick = () => {
        setshowMessages(false);
        setshowRequests(true);
    };
    
    const OthersButtonClick = () => {
        setshowMessages(true);
        setshowRequests(false);
    };

  return (
    <>
        <Navbar />
        <div class='chat-page-bounds'>
            <div class = 'chats-container'>

                {/* This section is left-section of the page which has previews of people and groups/posts you are chatting about */}
                <div class='chat-section-left'>
                    <div class='left-chat-head'>
                         <div>Chats</div>
                        <div>Compose</div>
                    </div>  

                    <input placeholder="Search messages" class = 'chat-search' />

                    <div class = 'chat-left-row'>
                        <span onClick={FocusedButtonClick} class = 'text-hover-chat'>Requests</span>
                        <span onClick={OthersButtonClick} class = 'text-hover-chat'>Others</span>
                    </div>

                    {/* This shows the previews of the chats */}

                    {/* This shows the Request from posts posted by logged in user */}
                    {!postRequestData ? (
                    'No data available'
                    ) : (   
                        showRequests &&
                            <div style={{width:"100%"}}>
                                {!postRequestLoading && postRequestData && postRequestData.map((request, index) => (
                                    <RequestPreview
                                    title = {request.title}
                                    message = {request.desc}
                                    userId = {request.userId}
                                    key = {index}   // we should ideally use request.createdAt or some unique combination for all messages to act as index, fix and update accordingly 
                                    />
                                ))}
                            </div>  
                        
                    )}

                    {showMessages && 
                    <div style={{width:"100%"}}>
                        <ChatPreview />
                        <ChatPreview />
                        <ChatPreview />
                        <ChatPreview />
                    </div>
                    }


                </div>

                {/* This is the right section which by default opens most recent convo, its use is to view and chat with people you want to! */}
                <div class = 'chat-section-right'>
                    <div class = 'chat-rigth-head'>
                        <span style={{paddingLeft:'20px'}}>User Name</span>
                    </div>  

                    {/* This area will show the text messages */}
                    <div class = 'chat-message-show-container'>
                        test
                    </div>

                    <div class = 'chat-input-box'>
                        <input class = 'chat-input-area' placeholder='Write a message...' />
                        <button class = 'chat-send-btn'>Send</button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Chats