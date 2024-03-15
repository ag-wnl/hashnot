import React, { useContext, useEffect, useState } from 'react'
import '../components/component.css';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import { Box, CloseButton, Input, InputGroup, InputLeftElement, List, ListItem, Tag, TagCloseButton } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

// This is a component which is used in profile section and acts as a form 
// to update user profile

function Update({ setOpenUpdate, user }) {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
    const [skillsData, setSkillsData] = useState();
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillsInputValue, setSkillsInputValue] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);

    const [texts, setTexts] = useState({
        pfp: "",
        name: "",
        about: "",
        github: "",
        website: "",
        userId: userId
    })

    const handleSkillInputChange = (e) => {
        const value = e.target.value;
        setSkillsInputValue(value);
    
        // Filter skills data based on input value
        const filtered = skillsData.filter(skill =>
          skill.skill.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSkills(filtered);
    };


    const handleSkillClick = (skill) => {
        // Append the clicked skill to the selectedSkills list
        setSelectedSkills(prev => [...prev, { id: skill.id, skill: skill.skill }]);
        setSkillsInputValue(''); // Clear the input value after selection
    };

    const handleRemoveSkill = (skillId) => {
        // Remove the skill from the selectedSkills list
        setSelectedSkills(prev => prev.filter(skill => skill.id !== skillId));
    };


    const handleChange = (e) => {
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
        return makeRequest.put("/users", user);
        },
        {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["user"]);
        },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ ...texts });
        setOpenUpdate(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:8800/api/skills`)
        .then((response) => {
            setSkillsData(response.data);
        })
    }, [])

    return (
        <>
            <div class = 'update-box'>
                <div class = 'upd-row'>
                    <h3 style={{fontWeight:'500'}}>Update Profile</h3>
                    <CloseIcon 
                    style={{cursor:'pointer'}}
                    size='xs' onClick={() => setOpenUpdate(false)} />
                </div>    


                <form class = 'upd-inp-field'>
                    <div class = "profile-update-fields">
                    <span style={{fontWeight:'500'}}>Profile Picture</span>
                        <Input class = 'upd-inp-txt' type = "text" name = "pfp" placeholder="Profile Picture Link"  onChange={handleChange} />
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>Display Name</span>
                        <Input class = 'upd-inp-txt' type = "text" name= "name" placeholder="Name" onChange={handleChange} />
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>About</span>
                        <Input class = 'upd-inp-txt' type = "text" name = "about" placeholder="About" onChange={handleChange} />
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>Social Links</span>
                        <Input class = 'upd-inp-txt' type = "text" name= "github" placeholder="Github Profile Link" onChange={handleChange} />   
                        <Input class = 'upd-inp-txt' style={{marginTop:"5px"}} type = "text" name= "website" placeholder="Personal Website Link" onChange={handleChange} />
                    </div>

                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>Skills</span>
                        <div class = 'skills-update'>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                <AddIcon color='gray.300' />
                                </InputLeftElement>

                                <Input 
                                size='md'
                                placeholder="Start typing"
                                onChange={handleSkillInputChange}
                                value={skillsInputValue}
                                />
                            </InputGroup>                            
                        </div>

                        <div>
                            {skillsInputValue && (
                                <Box position="absolute" zIndex="1" bg='black'>
                                    <List borderWidth="1px" borderRadius="md">
                                        {filteredSkills.map(skill => (
                                        <ListItem 
                                        style={{cursor:'pointer'}}
                                        zIndex="99"
                                        onClick={() => handleSkillClick(skill)}
                                        key={skill.id} p={2} _hover={{ bg: "gray.700" }}>
                                            {skill.skill}
                                        </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </div>

                        <div>
                            {/* Display selected skills */}
                            <div class = 'selected-skills'>
                                {selectedSkills.map(skill => (
                                    <Tag key={skill.id}>
                                        <span>{skill.skill}</span>
                                        <TagCloseButton onClick={() => handleRemoveSkill(skill.id)} />
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>


                <button 
                    onClick={handleClick}
                    class = 'login-btn'
                    >Update Profile</button>
            </div>
        </>
    )
}

export default Update