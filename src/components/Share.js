import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import '../components/component.css';
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import { Avatar, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, List, ListItem, Menu, MenuButton, MenuItem, MenuList, Tag, TagCloseButton, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

function Share() {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;


    const [notification, setNotification] = useState();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [sliderValue, setSliderValue] = useState(1);
    const [objective, setObjective] = useState("");
    
    const [skillsData, setSkillsData] = useState();
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillsInputValue, setSkillsInputValue] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);


    const isErrorTitle = title === ''

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8800/api/skills`)
        .then((response) => {
            setSkillsData(response.data);
        })
    }, [])

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

    const handleClick = e => {
        const PostData = {
            title, desc, sliderValue, objective, userId,
            skills: selectedSkills.map(skill => skill.id)  // Extract skill names from selectedSkills
        };

        console.log(PostData);

        try {
            axios.post('http://localhost:8800/api/posts', PostData).then(() => {
                setNotification('success');
            })
        } catch (error) {
            setNotification('failed');
            console.log('Error: ', error);
        }
    }

    let user_pfp = userimg;
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

                    {/* Title of the post */}
                    <FormControl isInvalid={isErrorTitle}>
                        <FormLabel>Title</FormLabel>
                        <Input 
                        onChange={(e) => setTitle(e.target.value)}  
                        value={title} 
                        type='title' />
                        {!isErrorTitle ? (
                            <FormHelperText>
                                This will be shown as heading of the post
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </FormControl>

                    {/* Post description */}
                    <FormControl isRequired>
                        <FormLabel>Text</FormLabel>
                        <Textarea    
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc} 
                        type='text-description' />
                    </FormControl>


                    <div class = 'inp-row'>

                        {/* Required member count slider */}
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

                        {/* Objective selection */}
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                {objective ? objective : 'Objective'}
                            </MenuButton>
                            <MenuList>
                                <MenuItem value="" onClick={(e) => setObjective(e.target.value)}>No Selection</MenuItem>
                                <MenuItem value="Hackathon" onClick={(e) => setObjective(e.target.value)}>Hackathon</MenuItem>
                                <MenuItem value="Project" onClick={(e) => setObjective(e.target.value)}>Project</MenuItem>
                                <MenuItem value="Research" onClick={(e) => setObjective(e.target.value)}>Research</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    {/* Skill selection: */}
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
                </div>

                <div>
                    <Button
                    isDisabled = {(title === "" || title.length > 150 ) || (desc === "" || desc.length < 2 || desc.length > 240)}
                    onClick={handleClick}
                    >Share Post</Button>

                </div>
            </div>
        </>
    )
}

export default Share