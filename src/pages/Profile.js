import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import git_img from "../imgs/github.svg"
import edit from "../imgs/edit.svg"
import website_img from "../imgs/link.svg"
import Posts from '../components/Posts';
import Invites from '../components/Invites';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import Update from '../components/Update';

function Profile() {

    const { currentUser } = useContext(AuthContext);
    const { userName } = useParams();
    const queryClient = useQueryClient();

    const [openUpdate, setOpenUpdate] = useState(false);

    const { isLoading, error, data: userData, refetch: userRefetch } = useQuery({
        queryKey: ["user", userName],
        queryFn: () => makeRequest.get("users/find/" + userName).then(res => {
            return res.data;
        })
    });

    let userId =  userData?.id;

    //I made the second query go only when first is done im so smart!
    const { isLoading: relationLoading, data: relationData, refetch: relRefetch } = useQuery(
        ["relation"],
        () =>
            makeRequest.get("/relations?followedUserId=" + userId).then((res) => {
                return res.data;
            }),
        {
            enabled: !!userId, // Only enable the query when userId is truthy (not null or undefined)
        }
    );

    //refetch user data and relation data again when username changes
    useEffect(() => {
        userRefetch().then((newUserData) => {
            userId = newUserData?.id;
            relRefetch();
        });
    }, [userName]);

    console.log("refetched data for ID: " + userId);
    console.log(relationData);
    
    const mutation = useMutation(
        (following) => {
        if (following)
            return makeRequest.delete("/relations?userId=" + userId);
        return makeRequest.post("/relations", { userId });
        },
        {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["relation"]);
        },
        }
    );

    const handleFollow = () => {
        mutation.mutate(relationData.includes(currentUser.id));
    };

    return (
        <>
            <Navbar />
            {isLoading ? ('Loading User Profile...')
            : (
                <div class = 'profile-page'>
                    <div class = 'profile-header'>
                        <h2>Profile</h2>
                    </div>
                    <div class = 'profile-cards-row'>
                        <div class = 'profile-card'>
                            <div class = 'profile-row'>
                                
                                {userData.pfp ? 
                                <img 
                                style={{width:'90px',height:'90px',borderRadius:'12px'}} 
                                src={userData.pfp} />
                                :
                                <img 
                                style={{width:'70px',height:'70px',borderRadius:'12px'}} 
                                src={userimg} />}
                                
                                <h2>{userData.username}</h2>
                                
                                {/* Edit or Update Profile */}
                                {!relationLoading && (userData.id === currentUser.id)
                                    && (<button title='Edit' class='edit-btn' onClick={()=>setOpenUpdate(true)}>
                                    <img src={edit} /></button>)}
                            </div>
                            <div class = 'profile-row'>
                                <span>{userData.name}</span>
                            </div>
                            {(userData.about) && <span>{userData.about}</span>}
                            <div class = 'profile-links'>
                                {(userData.github) &&
                                <Link 
                                style={{color:'black'}}
                                to='https://google.com/'>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img 
                                    style={{width:'20px'}}
                                    src={git_img} />
                                    <b>Github: </b>{userData.github}</span>
                                </Link>
                                }
                                {(userData.website) &&
                                <Link 
                                style={{color:'black'}}
                                to='https://google.com/'>
                                    <span  style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img
                                    style={{width:'20px'}}
                                    src={website_img} />
                                    <b>Website: </b>{userData.website}</span>
                                </Link>
                                }
                            </div>
                        </div>

                        <div class = 'other-utils'>
                            <h2>Showcase</h2>
                            <div class = 'showcase'>
                                #1 in Google Kickstart 2040, Won Facebook HackerCup
                            </div>
                            <span style={{fontSize:'14px'}}><b>Skills: </b>C++, JavaScript, Data Science, Databases</span>
                            
                            <div class = 'profile-row'>
                                {relationLoading ? ("Loading") : (userData.id != currentUser.id 
                                    && <button class='profile-btn'
                                        onClick={handleFollow}
                                        >
                                        {relationData.includes(currentUser.id) 
                                        ? "Following" 
                                        : "Follow"}
                                        </button> )}
        
                                <button class='profile-btn'>Chat</button>
                            </div>
                            
                        </div>
                    </div>
                    {openUpdate &&  <Update setOpenUpdate={setOpenUpdate} user = {userData} />}
                    <Invites />

                    {/* To show only posts by user whos profile we viewing */}
                    <h2>Your Posts</h2>
                    <Posts userId={userData.id} />
                </div>
            )}
        </>
    );
};

export default Profile;