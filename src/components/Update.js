import React, { useState } from 'react'
import '../components/component.css';
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';

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
                    <input class = 'upd-inp-txt' type = "text" name = "pfp" placeholder="Pfp  Link"  onChange={handleChange}></input>
                    <input class = 'upd-inp-txt' type = "text" name= "name" placeholder="Name" onChange={handleChange}></input>
                    <input class = 'upd-inp-txt' type = "text" name = "about" placeholder="About" onChange={handleChange}></input>
                    <input class = 'upd-inp-txt' type = "text" name= "github" placeholder="Github Link" onChange={handleChange}></input>
                    <input class = 'upd-inp-txt' type = "text" name= "website" placeholder="Website Link" onChange={handleChange}></input>
                </form>
                <button 
                    style={{marginTop:'2rem'}}
                    onClick={handleClick}
                    class = 'login-btn'
                    >Update Profile</button>
            </div>
        </>
    )
}

export default Update