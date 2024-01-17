import React, { useEffect, useState } from 'react';
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
import IndividualRequestsPanel from './IndividualRequestsPanel';


const InvitesContainer = ({ userId }) => {
    
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
                <div className='profile-message-requests-parent'>
                    <span style={{ fontSize: '20px', paddingTop: '10px' }}>Requests</span>

                    <div>
                        {!isLoading &&  data && data.map((request, index) => (
                            <IndividualRequestsPanel
                            message={request.desc}
                            userId={request.userId}
                            key={index}   // we should ideally use request.createdAt or some unique combination for all messages to act as index, fix and update accordingly 
                            />
                        ))}
                    </div>  
                </div>
            )}
        </>
    );
};

export default InvitesContainer;
