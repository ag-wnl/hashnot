import React from 'react'
import '../components/component.css';
import userimg from "../imgs/user.png"
import { Avatar } from '@chakra-ui/react';

function RequestPreview({ name, title, message, userId, pfp }) {
  const handleClick = () => {
    console.log('Clicked on RequestPreview');
    // onClick(); // Call the provided onClick function
  };
  return (
    <>
        <div class = 'chat-preview'>
            {/* This is the pfp section div */}
            <div class = 'chat-pfp-div'>
              <Avatar name={name} size='sm' src={pfp} />
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              <span style={{fontWeight:'500'}}>{name}</span>
              <span style={{fontSize:'12px',color:'#ababab'}}>{message}</span>
            </div>
        </div>  
    </>
  )
}

export default RequestPreview;