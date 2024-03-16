import React, { useContext, useState } from 'react'
import '../App.css';
import Navbar from '../components/Navbar'
import 'stream-chat-react/dist/css/index.css'
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RequestPreview from '../components/RequestPreview';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Button, Input, Spinner, Textarea } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import axios from 'axios';



function ChatMessageBox({ messageContent }) {
    const navigate = useNavigate();
    const timeAgo = moment(messageContent.createdAt).fromNow();
   
    return (
        <div class = 'chat-message-box'>
            <div style={{display:'flex', flexDirection:'row', gap:'10px', justifyContent:'space-between', alignItems:'center'}}>

                <div 
                onClick={()=> navigate(`/profile/${messageContent.username}`)}
                style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center', cursor:'pointer'}}>
                    <Avatar size='sm' name={messageContent.name} src={messageContent.pfp} />
                    <span style={{fontWeight:'500', color:'#e0deff'}}>{messageContent.name}</span>
                </div>
                
                <div>
                    <span style={{fontSize:'12px', marginRight:'10px', color:'grey'}}>{timeAgo}</span>
                </div>
            </div>
            <span style={{marginLeft:'20px'}}>{messageContent.message}</span>
        </div>
    )
}

function Chats() {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
    const navigate = useNavigate();

    const { isLoading: postRequestLoading , error, data: postRequestData } = useQuery({
        queryKey: ['userId', userId],
        queryFn: () => makeRequest.get(`/chats/getChatList?userId=${userId}`).then(res => {
            return res.data;
        }),
        enabled : !!userId,
    });


    const [chatBoxMessages, setchatBoxMessages] = useState([]);
    const [chatBoxUserName, setchatBoxUserName] = useState("Explore Messages")
    const [currentUserPfp, setCurrentUserPfp] = useState();
    const [chatBoxUserUsername, setChatBoxUserUsername] = useState();
    const [typedMessage, setTypedMessage] = useState();
    const [chattingWithUserId, setChattingWithUserId] = useState();
    const [noMessagePreviewClicked, setNoMessagePreviewClicked] = useState(true);
    const [chatIsLoading, setChatIsLoading] = useState(false);

    const handleRequestPreviewClick = async(message) => {
        //get information of user with whom we are chatting using message.userId:
        setchatBoxUserName(message.name);
        setCurrentUserPfp(message.pfp);
        setChattingWithUserId(message.userId);
        setChatBoxUserUsername(message.username);
        setNoMessagePreviewClicked(false);

        setChatIsLoading(true);
        
        axios.get(`http://localhost:8800/api/chats?firstUser=${userId}&secondUser=${message.userId}`)
        .then((response) => {
            setchatBoxMessages(response.data);
            console.log(chatBoxMessages);
            setChatIsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching chat messages:', error);
        });
    };
    
    const handleSendMessage = async() => {
        console.log(`Message data : ${typedMessage}`);

        try {
            axios.post(`http://localhost:8800/api/chats`, {
            sendToUser : chattingWithUserId,
            userId : userId,
            message: typedMessage
            }).then(() => {
                setTypedMessage();
                
                axios.get(`http://localhost:8800/api/chats?firstUser=${userId}&secondUser=${chattingWithUserId}`)
                .then((response) => {
                    setchatBoxMessages(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching chat messages:', error);
                });
            })
        } catch (error) {
            console.log("Error : ", error);
        }
        
    }

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
                            <div style={{width:"100%"}}>
                                {!postRequestLoading && postRequestData && postRequestData.map((request, index) => (
                                    <div 
                                    onClick = {() => {
                                        handleRequestPreviewClick(request);
                                    }}

                                    key = {index}
                                    // we should ideally use request.createdAt or some unique combination for all messages to act as index, fix and update accordingly 
                                    > 

                                        <RequestPreview
                                        onClick
                                        name = {request.name}
                                        userId = {request.userId}
                                        username = {request.username}
                                        pfp = {request.pfp}
                                        />

                                    </div>
                                ))}
                            </div>  
                        
                    )}
                </div>

                {/* This is the right section which by default opens most recent convo, its use is to view and chat with people you want to! */}

                <div class = 'chat-section-right'>
                    {chatIsLoading ? <Spinner /> 
                    :
                    (noMessagePreviewClicked)
                    ?
                    <div> 
                        <div class = 'chat-rigth-head'>
                        <span 
                        style={{paddingLeft:'10px', fontWeight:'500', cursor:'pointer'}}> {chatBoxUserName} </span>
                        </div>  
                    </div>
                    :
                    <div>
                        <div class = 'chat-rigth-head'>
                            <Avatar 
                            style={{cursor:'pointer'}}
                            onClick={()=> navigate(`/profile/${chatBoxUserUsername}`)}
                            size='sm' src={currentUserPfp} name={chatBoxUserName} />
    
                            <span 
                            onClick={()=> navigate(`/profile/${chatBoxUserUsername}`)}
                            style={{paddingLeft:'10px', fontWeight:'500', cursor:'pointer'}}> {chatBoxUserName} </span>
                        </div>  

                        {/* This area will show the text messages */}
                        <div class = 'chat-message-show-container'>
                            {chatBoxMessages &&  chatBoxMessages.map((message, index) => (
                                // <div key = {index}> {message.text} </div>
                                <ChatMessageBox key = { index } messageContent = { message } />
                            ))}
                        </div>

                        <div class = 'chat-input-box'>
                            <div style={{width:'100%'}}>
                                <Textarea 
                                onChange={(e) => setTypedMessage(e.target.value)}
                                class = 'chat-input-area' placeholder='Type message' />
                            </div>

                            <div>
                                <Button onClick={handleSendMessage}>Send</Button>
                            </div>
                            
                        </div>
                    </div>
                    }                   
                </div>

            </div>
        </div>
    </>
  )
}

export default Chats