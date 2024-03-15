import React, { useEffect, useState } from 'react';
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
import IndividualRequestsPanel from './IndividualRequestsPanel';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';


const InvitesContainer = ({ userId }) => {
    
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['userId', userId],
        queryFn: () => makeRequest.get('/showrequest?userId=' + userId).then(res => {
            return res.data;
        })
    });

    return (
        <>
            {!data ? (
            'No data available'
            ) : (
                <div className='profile-message-requests-parent'
                onClick={()=> navigate(`/chats`)}
                >
                    <span style={{color:'#e0deff', fontSize: '24px', paddingTop: '20px', fontWeight:'500', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>Requests & DMs <ExternalLinkIcon /> </span>

                    <div>
                        {
                        isLoading ? <Spinner />
                        :
                        data && data.slice(0, 3).map((request, index) => (
                            <IndividualRequestsPanel
                            title = {request.title}
                            message = {request.desc}
                            userId = {request.userId}
                            key = {index}   // we should ideally use request.createdAt or some unique combination for all messages to act as index, fix and update accordingly 
                            />
                        ))}
                        {data.length === 0 
                        &&
                        <Alert status='success'>
                            <AlertIcon />
                            No pending requests, all catched up!
                        </Alert>
                        }
                    </div>  
                </div>
            )}
        </>
    );
};

export default InvitesContainer;
