import React from 'react'
import '../components/component.css';
import userimg from "../imgs/user.png"

function RequestPreview({ title, message, userId }) {
  return (
    <>
        <div class = 'chat-preview'>
            {/* This is the pfp section div */}
            <div class = 'chat-pfp-div'>
              <img class = 'chat-prev-pfp' src={userimg} />
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              <span>User Name</span>
              <span style={{fontSize:'12px',color:'#ababab'}}>{title}</span>
            </div>
        </div>
    </>
  )
}

export default RequestPreview;