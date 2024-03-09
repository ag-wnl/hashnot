import React from 'react'
import moment from 'moment';
import { Avatar } from '@chakra-ui/react';

//This is a reusable message container
function MessageBox({pfp, senderName, createdAt, messageString}) {
  return (
    <>
        <div className="message">          
            <div>
                <div style={{display:'flex', gap:'0.7rem', alignItems:'center'}}>
                    <Avatar size='sm' name='Dan Abrahmov' src={pfp} />
                    <span style={{fontSize:'14px', fontWeight:'700'}}>{senderName}</span>

                    <span style={{fontSize:'10px'}} className="date">
                      {moment(createdAt).fromNow()}
                    </span>
                </div>
            </div>
            
            <p style={{fontSize:'14px'}}>{messageString}</p>
        </div>
    </>
  )
}

export default MessageBox