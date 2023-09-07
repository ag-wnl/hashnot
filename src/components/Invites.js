import React from 'react'
import '../components/component.css';

function Invites() {
    return (
        <>
            <div class = 'invite-container'>
                <div 
                style={{display:'flex', msFlexDirection:'row', gap:'4rem', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                        Post Title
                    </div>
                    <span>User Requested to join</span>
                    <button class = 'review-btn'>Review</button>
                </div>
            </div>
        </>
    )
}

export default Invites;