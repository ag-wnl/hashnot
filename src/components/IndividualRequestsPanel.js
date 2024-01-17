import React, { useEffect, useState } from 'react'
import '../components/component.css';


function IndividualRequestsPanel({ message, userId }) {

    return (
        <div className='invite-container'>
            <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '4rem',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            >
            <div style={{ fontSize: '14px' }}>Post Title</div>
    
            <span style={{ fontSize: '12px' }}>
                {message && message.length > 30 ? `${message.slice(0, 30)}...` 
                : 
                message}   
            </span>
    
            <button className='review-btn'>Open</button>
            </div>
        </div>
    )
}

export default IndividualRequestsPanel
