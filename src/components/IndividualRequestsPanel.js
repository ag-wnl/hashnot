import React, { useEffect, useState } from 'react'
import '../components/component.css';
import { Alert, AlertIcon } from '@chakra-ui/react';


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
        <div>
            <Alert status='info' variant='left-accent' style={{cursor:'pointer'}}>
                <AlertIcon />
                <div>
                    {title && title.length > 20 ? `${title.slice(0, 20)}...` 
                    : 
                    title}
                </div>
        
                <span style={{ fontSize: '14px'}}>
                    {message && message.length > 30 ? `${message.slice(0, 30)}...` 
                    : 
                    message}   
                </span>        
            </Alert>
            
        </div>
    )
}

export default IndividualRequestsPanel
