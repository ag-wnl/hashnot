import React from 'react'
import '../components/component.css';
import userimg from "../imgs/user.png"

function ChatPreview() {
  return (
    <>
        <div class = 'chat-preview'>
            {/* This is the pfp section div */}
            <div class = 'chat-pfp-div'>
              <img class = 'chat-prev-pfp' src={userimg} />
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              <span>User Name</span>
              <span style={{fontSize:'12px',color:'#ababab'}}>Text Message</span>
            </div>
        </div>
    </>
  )
}

export default ChatPreview