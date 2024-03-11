import React, { useContext, useEffect, useState } from 'react'
import '../App.css';
import Navbar from '../components/Navbar'
import ChatPreview from '../components/ChatPreview';
import 'stream-chat-react/dist/css/index.css'
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import RequestPreview from '../components/RequestPreview';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Button, Input, Textarea } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';


function ChatMessageBox({ messageContent }) {
    const timeAgo = moment(messageContent.createdAt).fromNow();
    return (
        <div class = 'chat-message-box'>
            <div style={{display:'flex', flexDirection:'row', gap:'10px', justifyContent:'space-between', alignItems:'center'}}>

                <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center'}}>
                    <Avatar size='sm' name={messageContent.name} src={messageContent.pfp} />
                    <span style={{fontWeight:'500', color:'#e0deff'}}>{messageContent.name}</span>
                </div>
                
                <div>
                    <span style={{fontSize:'12px'}}>{timeAgo}</span>
                </div>
            </div>
            <span>{messageContent.text}</span>
        </div>
    )
}

function Chats() {
    const location = useLocation();
    const chatData = location.state?.chatData;

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;

    console.log(userId);
    const { isLoading: postRequestLoading , error, data: postRequestData } = useQuery({
        queryKey: ['userId', userId],
        queryFn: () => makeRequest.get('/showrequest?userId=' + userId).then(res => {
            return res.data;
        }),
        enabled : !!userId,
    });


    //send chat: 
    // need : desc, userId , postId, url POST : http://localhost:8800/api/messages ?desc=&userId= &postId= 

    // Handling Focused and Other message button Switch
    const [showRequests, setshowRequests] = useState(true);
    const [showMessages, setshowMessages] = useState(true);
    const [chatBoxMessages, setchatBoxMessages] = useState([]);
    const [chattingWithUserId, setchattingWithUserId] = useState(null);
    const [chatBoxUserName, setchatBoxUserName] = useState("Explore Messages")
    const [currentUserPfp, setCurrentUserPfp] = useState();

    const FocusedButtonClick = () => {
        setshowMessages(false);
        setshowRequests(true);
    };
    
    const OthersButtonClick = () => {
        setshowMessages(true);
        setshowRequests(false);
    };

    const handleRequestPreviewClick = (message) => {
        //get information of user with whom we are chatting using message.userId:

        setchatBoxUserName(message.name);
        setCurrentUserPfp(message.pfp);
        const newMessage = { text: message.desc, name: message.name, pfp: message.pfp, 
            time: message.createdAt };

        //Appending new message to the array of previous messages:
        // setchatBoxMessages((prevMessages) => [...prevMessages, newMessage]);

        //But for now, we just want current request message shown, so replacing it:
        setchatBoxMessages([newMessage]);
    };
    

  return (
    <>
        <Navbar />
        <div class='chat-page-bounds'>
            <div class = 'chats-container'>

                {/* This section is left-section of the page which has previews of people and groups/posts you are chatting about */}
                <div class='chat-section-left'>
                    <div style={{width:'90%'}}>
                        <Input size='sm' placeholder="Search messages"/>
                    </div>
                    {/* <div class = 'chat-left-row'>
                        <span onClick={FocusedButtonClick} class = 'text-hover-chat'>Requests</span>
                        <span onClick={OthersButtonClick} class = 'text-hover-chat'>Others</span>
                    </div> */}

                    {/* This shows the previews of the chats */}

                    {/* This shows the Request from posts posted by logged in user */}
                    {!postRequestData ? (
                    <div style={{padding:'0px'}}>
                        <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                        >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            All caught up!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            Your inbox is empty right now, so peaceful right?
                        </AlertDescription>
                        </Alert>
                    </div>
                    ) : (   
                        showRequests &&
                            <div style={{width:"100%"}}>
                                {!postRequestLoading && postRequestData && postRequestData.map((request, index) => (
                                    <div 
                                    onClick = {() => {
                                        console.log('Clicked on RequestPreview in Chats');
                                        handleRequestPreviewClick(request);
                                    }}

                                    key = {index}
                                    // we should ideally use request.createdAt or some unique combination for all messages to act as index, fix and update accordingly 
                                    > 

                                        <RequestPreview
                                        name = {request.name}
                                        title = {request.title}
                                        message = {request.desc}
                                        userId = {request.userId}
                                        pfp = {request.pfp}
                                        />

                                    </div>
                                ))}
                            </div>  
                        
                    )}
                </div>

                {/* This is the right section which by default opens most recent convo, its use is to view and chat with people you want to! */}

                <div class = 'chat-section-right'>
                    <div class = 'chat-rigth-head'>
                        <Avatar size='sm' src={currentUserPfp} name={chatBoxUserName} />
                        <span style={{paddingLeft:'20px', fontWeight:'500'}}> {chatBoxUserName} </span>
                    </div>  

                    {/* This area will show the text messages */}
                    <div class = 'chat-message-show-container'>
                        {chatBoxMessages &&  chatBoxMessages.map((message, index) => (
                            // <div key = {index}> {message.text} </div>
                            <ChatMessageBox key = { index } messageContent = { message } />
                        ))}
                    </div>

                    <div class = 'chat-input-box'>
                        <Textarea class = 'chat-input-area' placeholder='Type message' />
                        <Button>Send</Button>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Chats