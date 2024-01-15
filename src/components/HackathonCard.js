import React from 'react';

import person from "../imgs/people.png"

const HackathonCard = ({ hackathon }) => {

  return (
    <div class = 'hackathon-card-parent'>
        <h3>{hackathon.title}</h3>
        <img
        style={{maxWidth:"200px"}} 
        src={hackathon.thumbnail_url} />

        <span style={{marginTop:"15px"}}>{hackathon.organization_name}</span>

        <a style={{marginTop:"10px"}} class="hackathon-register-btn" href={hackathon.url} target="_blank" rel="noopener noreferrer">Register</a>
        
        <div class = "hackathon-card-row">
            <p class = "hackathon-prize-money">
                ${(hackathon.prize_amount).replace(/\D/g, '')} in prizes</p>
        
            <p class="hackathon-time-left">{hackathon.time_left_to_submission}</p>
        </div>
        
        <div class = "hackathon-card-row-bottom">
            <div class = "hackathon-users">
                <img style={{width:"20px"}} src={person} />
                {hackathon.registrations_count}
            </div>

            <div>{hackathon.displayed_location.location}</div>

            {hackathon.themes.slice(1, 3).map((theme, index) => (
                <span>{theme.name}</span>
            ))}
        </div>
    </div>
  );
};

export default HackathonCard;
