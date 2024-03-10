import React from 'react'
import { useContext, useState } from "react";
import '../components/component.css';
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from "../axios";
import { Avatar, Button, Input, Textarea } from '@chakra-ui/react';

function Share() {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const userId = currentUser?.userId;

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [skills, setSkills] = useState("")
    const [sliderValue, setSliderValue] = useState(1);
    const [objective, setObjective] = useState("");
    const [domains, setDomains] = useState([]);
    let domainString = domains.join(',');
    console.log(domainString);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleObjectiveChange = (e) => {
        setObjective(e.target.value);
    }

    const handleDomainSelect = (selectedDomain) => {
        // Check if the selectedSkill is not already in the skills array
        if (!domains.includes(selectedDomain)) {
          // Add the selectedSkill to the skills array
          setDomains([...domains, selectedDomain]);
        }
    };

    const handleDomainClick = (clickedDomain) => {
        // Filter out the clicked skill and update the skills array
        const updatedDomains = domains.filter((domain) => domain !== clickedDomain);
        setDomains(updatedDomains);
    };

    const mutation = useMutation(
        (newPost) => {
          return makeRequest.post("/posts", newPost);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"]);
          },
        }
    );

    const handleClick = e => {
        e.preventDefault()
        mutation.mutate({title, desc, skills, sliderValue, objective, domainString, userId})
    }

    var user_pfp = userimg;
    if(currentUser.pfp) {
        user_pfp = currentUser.pfp;
    }

    return (
        <>
            <div class = 'share-card'>
                <div class = 'share-card-header'>
                    <Avatar size='sm' src={user_pfp} alt="" />
                    <span style={{fontSize:'18px', fontWeight:'500', color:'rgb(193, 193, 255)'}}>@{currentUser.username}</span>
                </div>
                
                <div class = 'post-inp-area'>
                    <Input
                    class = 'create-post-title'
                    type="text"
                    placeholder={`Type your amazing post Title here!`}
                    onChange={(e) => setTitle(e.target.value)}
                    // value={desc}
                    />
                    <Textarea 
                    rows="5" 
                    class = 'create-post-desc'
                    type="text"
                    placeholder={`The Post description goes here! You can also add relevant links in here.`}
                    onChange={(e) => setDesc(e.target.value)}
                    // value={desc}
                    />

                    
                    <Input
                        class = 'create-post-skills'
                        type="text"
                        placeholder={`Mention desired skills, seperated by ,`}
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <div class = 'inp-row'>
                        <div class = 'req-members-cnt'>
                            <span style={{fontWeight:'500'}}>Required Members</span>
                            <input 
                            class = 'number-req-selector'
                            onChange={handleSliderChange}
                            type="range" 
                            id="slider"
                            defaultValue={1} 
                            min="1" max="12" step="1"/>
                            <span className="slider-value">{sliderValue}</span>
                        </div>

                        <div class = 'obj-type-inp'>
                            <span style={{fontWeight:'500'}}>Objective</span>
                            <form>                                
                                <select name="sort" id="sort" value={objective} onChange={handleObjectiveChange}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Project">Project</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    {/* domain selection: */}
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'1rem',fontSize:'14px'}}>
                        <p style={{fontWeight:'500'}}>Select Skill Domain</p>
                        <select name="sort" id="sort" onChange={(e) => handleDomainSelect(e.target.value)}>
                                        <option selected="selected" disabled>No Selection</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="machine-learning">Machine Learning</option>
                                        <option value="mobile-app-dev">Mobile App Development</option>
                                        <option value="devops">DevOps</option>
                                        <option value="database-mgmt">Database Management</option>
                                        <option value="data-science">Data Science</option>
                                        <option value="cloud-computing">Cloud Computing</option>
                                        <option value="cybersecurity">Cybersecurity</option>
                                        <option value="blockchain-dev">Blockchain Development</option>
                                        <option value="game-dev">Game Development</option>
                                        <option value="fintech">FinTech</option>
                                        <option value="bioinformatics">Bioinformatics</option>
                        </select>

                        {/* show domains selected */}
                        <div class = 'skill-select-show'>
                            {domains.map((domain, index) => (
                                <span key={index}
                                title='Remove'
                                onClick={() => handleDomainClick(domain)}
                                className="selected-skill">
                                {domain}
                                </span>
                            ))}
                        </div>
                    </div>
                        
                </div>

                <div class = 'share-bottom-bar'>
                    <p style={{fontSize:'10px', color:'gray', fontWeight:'500'}}>*The more post options you fill out, the easier it is for users to find it!</p>
                            
                    <Button
                    onClick={handleClick}
                    >Share Post</Button>

                </div>
            </div>
        </>
    )
}

export default Share