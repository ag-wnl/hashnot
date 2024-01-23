import React, { useEffect, useState } from 'react'
import '../components/component.css';


function IndividualRequestsPanel({ title, message, userId }) {

    const handleRequestPreviewClicked = () => {
        // try {
        //     console.log("clicked");
        // } catch (error) {
        //     console.log("Error: ", error);
        // }
        console.log("TEST")
    }

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
                <div style={{ fontSize: '14px' }}>
                    {title && title.length > 20 ? `${title.slice(0, 20)}...` 
                    : 
                    title}</div>
        
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
