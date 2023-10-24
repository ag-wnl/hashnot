import React from 'react'
import moment from 'moment';

//This is a reusable message container
function MessageBox({pfp, senderName, createdAt, messageString}) {
  return (
    <>
        <div className="message">          
            <div className="msg-info">
                
                <div style={{display:'flex', gap:'0.7rem'}}>
                    <img 
                    class = 'msg-pfp'
                    src={pfp} alt="" />
                    <span style={{fontSize:'14px', fontWeight:'700'}}>{senderName}</span>
                </div>

                <span style={{fontSize:'10px'}} className="date">
                {moment(createdAt).fromNow()}
                </span>
            </div>
            
            <p style={{fontSize:'16px'}}>{messageString}</p>
        </div>
    </>
  )
}

export default MessageBox