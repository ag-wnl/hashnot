import React from 'react'
import '../components/component.css';
import { makeRequest } from '../axios';
import { useQuery } from 'react-query';


const Invites = ({userId}) => {

    function IndividualRequestsPanel({message, userId}) {
        return (
            <div class = 'invite-container'>
                    <div 
                    style={{display:'flex', msFlexDirection:'row', gap:'4rem', justifyContent:'space-between', alignItems:'center'}}>   
                        <div style={{fontSize:"14px"}}>
                            Post Title
                        </div>

                        <span style={{fontSize:"12px"}}>{message && message.length > 30 ? `${message.slice(0, 30)}...` : message}</span>
                        
                        <button class = 'review-btn'>Open</button>
                    </div>
            </div>
        )
    }
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['userId', userId],
        queryFn: () => makeRequest.get("/showrequest?userId=" + userId).then(res => {
          return res.data;
        })
      });

    return (
        <>
            {error
            ? "Something went wrong!"
            : isLoading
            ? "loading"
            : 
                <div class="profile-message-requests-parent">
                    <span style={{fontSize:"20px", paddingTop:"10px"}}>Requests</span>
                    
                    {data.map((request) => (
                    IndividualRequestsPanel({
                        message: request.desc,
                        userId: request.userId,
                        key: request.id
                    })
                ))}</div>
            }
      </>
    )
}

export default Invites;