import React, { useState } from 'react'
import '../components/component.css';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';

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
                    <h3>Update Profile</h3>
                    <button class='close-btn' onClick={() => setOpenUpdate(false)}>Close</button>
                </div>    
                <form class = 'upd-inp-field'>

                    <div class = "profile-update-fields">
                    <span>Profile Picture</span>
                        <input class = 'upd-inp-txt' type = "text" name = "pfp" placeholder="Pfp  Link"  onChange={handleChange}></input>
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span>Display Name</span>
                        <input class = 'upd-inp-txt' type = "text" name= "name" placeholder="Name" onChange={handleChange}></input>
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span>About</span>
                        <input class = 'upd-inp-txt' type = "text" name = "about" placeholder="About" onChange={handleChange}></input>
                    </div>
                    
                    <div class = "profile-update-fields">
                        <span>Social Links</span>
                        <input class = 'upd-inp-txt' type = "text" name= "github" placeholder="Github Profile Link" onChange={handleChange}></input>    
                        <input class = 'upd-inp-txt' style={{marginTop:"5px"}} type = "text" name= "website" placeholder="Personal Website Link" onChange={handleChange}></input>
                    </div>
                    
        
                </form>
                <button 
                    style={{marginTop:'4rem', position:"absolute", right:"40px", bottom:"20px"}}
                    onClick={handleClick}
                    class = 'login-btn'
                    >Update Profile</button>
            </div>
        </>
    )
}

export default Update