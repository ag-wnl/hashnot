import React from 'react'
import '../App.css';
import Navbar from '../components/Navbar'
import ChatPreview from '../components/ChatPreview';

function Chats() {
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
                        <span>Focused</span>
                        <span>Others</span>
                    </div>

                    {/* This shows the previews of the chats */}
                    <ChatPreview />

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