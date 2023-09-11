import React from 'react'
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
import chat_img from "../imgs/chat.png"
import team_img from "../imgs/team.png"
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';


function Profile() {

    const { currentUser } = useContext(AuthContext);
    
    // const userName = useLocation().pathname.split('/')[2]
    const { userName } = useParams();

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("/users/find/" + userName).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const userId = data?.id;
    
    //I made the second query go only when first is done im so smart!
    const { isLoading: relationLoading, data: relationData } = useQuery(
        ["relation"],
        () =>
            makeRequest.get("/relations?followedUserId=" + userId).then((res) => {
                return res.data;
            }),
        {
            enabled: !!userId, // Only enable the query when userId is truthy (not null or undefined)
        }
    );
    
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
                                
                                {data.pfp ? 
                                <img 
                                style={{width:'90px',height:'90px',borderRadius:'12px'}} 
                                src={data.pfp} />
                                :
                                <img 
                                style={{width:'70px',height:'70px',borderRadius:'12px'}} 
                                src={userimg} />}
                                
                                {/* Edit or Update Profile */}
                                <h3>{data.username}</h3>
                                {relationLoading ? ("Loading") :  (data.id === currentUser.id 
                                    && <button>
                                    <img src={edit} /></button>)}
                            </div>
                            <div class = 'profile-row'>
                                <span>{data.name}</span>
                            </div>
                            {(data.about) && <span>{data.about}</span>}
                            <div class = 'profile-links'>
                                {(data.github) &&
                                <Link 
                                style={{color:'black'}}
                                to='https://google.com/'>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img 
                                    style={{width:'20px'}}
                                    src={git_img} />
                                    <b>Github: </b>{data.github}</span>
                                </Link>
                                }
                                {(data.website) &&
                                <Link 
                                style={{color:'black'}}
                                to='https://google.com/'>
                                    <span  style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img
                                    style={{width:'20px'}}
                                    src={website_img} />
                                    <b>Website: </b>{data.website}</span>
                                </Link>
                                }
                            </div>
                        </div>

                        <div class = 'other-utils'>
                            <h3>Showcase</h3>
                            <div class = 'showcase'>
                                #1 in Google Kickstart 2040, Won Facebook HackerCup
                            </div>
                            <span style={{fontSize:'14px'}}><b>Skills: </b>C++, JavaScript, Data Science, Databases</span>
                            
                            <div class = 'profile-row'>
                                {relationLoading ? ("Loading") : (data.id != currentUser.id 
                                    && <button class='profile-btn'
                                        onClick={handleFollow}
                                        >
                                        {relationData.includes(currentUser.id) 
                                        ? "Following" 
                                        : "Follow"}
                                        </button> )}
                                
                                
                                <button class='profile-btn'>Chat</button>
                            </div>
                            
                            <div class = 'profile-row'>
                                <img 
                                title='View Teams'
                                style={{width:'30px', cursor:'pointer'}}
                                src = {team_img} />
                                <img 
                                title='View Chats'
                                style={{width:'20px', cursor:'pointer'}}
                                src = {chat_img} />
                            </div>
                        </div>
                    </div>
            
                    <Invites />
                    {/* <Posts /> */}
                </div>
            )}
        </>
    );
};

export default Profile;