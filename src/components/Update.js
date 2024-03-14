import React, { useState } from 'react'
import '../components/component.css';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import { Input } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// This is a component which is used in profile section and acts as a form 
// to update user profile

function Update({ setOpenUpdate, user }) {

    const [texts, setTexts] = useState({
        pfp: "",
        name: "",
        about: "",
        github: "",
        website: "",

    })

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
    
        //TODO: find a better way to get image URL
        
        mutation.mutate({ ...texts });
        setOpenUpdate(false);
    }

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