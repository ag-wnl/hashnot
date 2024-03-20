import React, { useContext, useEffect, useState } from 'react'
import '../components/component.css';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import { Box, Button, Input, InputGroup, InputLeftElement, List, ListItem, Tag, TagCloseButton, Textarea } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';


// This is a component which is used in profile section and acts as a form 
// to update user profile

function Update({ setOpenUpdate, user }) {
    console.log(user);
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
    const [skillsData, setSkillsData] = useState();
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [skillsInputValue, setSkillsInputValue] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [profilePicture, setProfilePicture] = useState([]);
 
    const [texts, setTexts] = useState({
        name: user.name,
        about: user.about,
        github: user.github,
        website: user.website,
        userId: userId
    })

    const handleImageChangeStuff = (imageToUpload) => {
        setProfilePicture(imageToUpload);
        console.log(imageToUpload);
    } 

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

        const checkIfExists = selectedSkills.some(selectedSkill => selectedSkill.id === skill.id);

        if(!checkIfExists) {
            setSelectedSkills(prev => [...prev, { id: skill.id, skill: skill.skill }]);
            setSkillsInputValue(''); // Clear the input value after selection
        }
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

        const updatedUser = {
            ...texts,
            skills: selectedSkills.map(skill => skill.id),  // Extract skill names from selectedSkills
            pfp: profilePicture[0] ? profilePicture[0].data_url : null
        };

        try {
            await mutation.mutate(updatedUser);
            setOpenUpdate(false);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
        
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
                        <span style={{fontWeight:'500'}}>Display Name</span>
                        <Input value={texts.name} class = 'upd-inp-txt' type = "text" name= "name" placeholder="Name" onChange={handleChange} />
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>About</span>
                        <Textarea resize='none' value={texts.about} class = 'upd-inp-txt' type = "text" name = "about" placeholder="About" onChange={handleChange} />
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span style={{fontWeight:'500'}}>Social Links</span>
                        <Input value={texts.github} class = 'upd-inp-txt' type = "text" name= "github" placeholder="Github Profile Link" onChange={handleChange} />   
                        
                        <Input value={texts.website} class = 'upd-inp-txt' style={{marginTop:"5px"}} type = "text" name= "website" placeholder="Personal Website Link" onChange={handleChange} />
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

                <div style={{margin:'40px 0px 40px 0px'}}>
                    <ImageUploading
                        value={profilePicture}
                        onChange={handleImageChangeStuff}
                        maxNumber={1}
                        dataURLKey="data_url"
                    >
                        {({
                        imageToUpload,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            
                            <Button
                            colorScheme='blue'
                            // box-shadow: 0px 0px 22px 1px rgba(96,119,212,1);
                            style={isDragging ? { color: 'blue', boxShadow:'0px 0px 22px 1px rgba(96,119,212,1)' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            >
                            Click or Drop here
                            </Button>
                            &nbsp;
                            <Button colorScheme='red' onClick={onImageRemoveAll}>Remove image</Button>
                            {profilePicture.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                    </ImageUploading>
                </div>

                <Button
                    onClick={handleClick}
                    >Update Profile</Button>
            </div>
        </>
    )
}

export default Update