import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import git_img from "../imgs/github-png.png"
import settingIcon from "../imgs/settings-icon.png"
import website_img from "../imgs/link.svg"
import Posts from '../components/Posts';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import Update from '../components/Update';
import InvitesContainer from '../components/InvitesContainer';
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { getAuthHeader } from "../context/authHeader.js"

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { userName } = useParams();   
    const userId = currentUser?.userId;
    
    const queryClient = useQueryClient();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [profileUserId, setUserId] = useState(null);
    const [followButtonText, setFollowButtonText] = useState("Loading");

    //{ refetchOnWindowFocus: false } helps not refetch data when tabs are switched 
    //Fetching current user using username from URL parameter:
    const { isLoading, error, data: userData, refetch: userRefetch } = useQuery({
        queryKey: ["user", userId, { refetchOnWindowFocus: false }],
        queryFn: async() => {
            try {
                const authHeader = await getAuthHeader();
                const response = await makeRequest.get("/users/findUserByUserName/" + userName, {
                    headers: {Authorization: authHeader},
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        } 
    });

    useEffect(() => {
        // Update userId when userData is available
        if (!isLoading && userData) {
            setUserId(userData.id);
        }
    }, [isLoading, userData]);


    // This is a dependednt query which depends on the previous userData fetcher, after userData recieved we execute it:
    const {isIdle, isLoading: relationLoading, data: relationData, refetch: relRefetch } = useQuery({
        queryKey: ["userId", userId, { refetchOnWindowFocus: false }],
        queryFn: async() => {
            try{
                const authHeader = await getAuthHeader();
                const response = await makeRequest.get(`/relations?followedUserId=${profileUserId}`, {
                    headers: {Authorization: authHeader},
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        enabled: !!profileUserId,  
    });


    // Refetch user data and relation data again when username changes, fetch new User ID:
    useEffect(() => {
        userRefetch().then((newUserData) => {
            setUserId(newUserData?.id);
            relRefetch();
        });
    }, [userName]);

    useEffect(() => {
        if(relationData && userId && !isLoading && currentUser) {
            if(relationData && relationData.includes(userId)) {
                setFollowButtonText("Following")
            } else {
                setFollowButtonText("Follow")
            }
        }
    }, [relationData])

    
    const mutation = useMutation(
        async (following) => {
            const authHeader = await getAuthHeader();
            const config = { headers: { Authorization: authHeader } };
            
            if(profileUserId) {
                if (following) {
                    return makeRequest.delete(`/relations?userId=${profileUserId}&curUserId=${userId}`, config);
                }
    
                return makeRequest.post(`/relations?userId=${profileUserId}&curUserId=${userId}`, null, config);
            }
        },
        {
            onSuccess: () => {
                relRefetch(); // Refetch user relations to update follow/following status
            },
        }
    );

    const handleFollow = async() => {
        try {
            if(relationData) {
                console.log("Follow Button Clicked, RelationData:", relationData);
                const following = relationData.includes(userId);
                await mutation.mutateAsync(following);
            }
        } catch (error) {
            console.error("Error during mutation:", error);
        }
    };

    //for Chat/DM page:
    const chatData = {
        chaatUserId: userId
    };

    const handleChatButtonClick = () => {
        const chatData = {
          userId : userId
        };
      
        navigate(`/chats`, { state: { chatData } });
      };

    return (
        <>
            <Navbar />
            {isLoading ? ('Loading User Profile...')    
            : (
                userData && userId &&
                <div class = 'profile-page'>
                    {/* <div class = 'profile-header'>
                        <h2>Profile</h2>
                    </div> */}
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
                                
                                <h2>@{userData.username}</h2>
                                
                                {/* Edit or Update Profile */}
                                {!relationLoading && (userData.id === currentUser.id)
                                    && (
                                    <div class="tooltip">
                                        <span class="tooltiptext">Settings</span>
                                        <img style={{width:"20px"}} onClick={()=>setOpenUpdate(true)} src={settingIcon} />
                                    </div>
                                    )}
                            </div>
                            <div class = 'profile-row'>
                                <span>{userData.name}</span>
                            </div>
                            {(userData.about) && <span>{userData.about}</span>}
                            <div class = 'profile-links'>
                                {(userData.github) &&
                                <Link 
                                style={{color:"white"}}
                                to='https://google.com/'>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img 
                                    style={{width:'30px'}}
                                    src={git_img} />
                                    <b>Github: </b>{userData.github}</span>
                                </Link>
                                }
                                {(userData.website) &&
                                <Link 
                                style={{color:'white'}}
                                to='https://google.com/'>
                                    <span  style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img
                                    style={{width:'30px'}}
                                    src={website_img} />
                                    <b>Website: </b>{userData.website}</span>
                                </Link>
                                }
                            </div>
                        </div>
                        
                        {/* right side of the page */}
                        <div class = 'other-utils'>
                            <h2>Showcase</h2>
                            <div class = 'showcase'>
                                #1 in Google Kickstart 2040, Won Facebook HackerCup
                            </div>
                            <span style={{fontSize:'14px'}}><b>Skills: </b>C++, JavaScript, Data Science, Databases</span>
                            
                            <div class = 'profile-row'>

                                {/* This is the follow/following button section" */}
                                {(profileUserId !== userId)
                                    && (<button class='profile-btn'
                                        onClick={handleFollow}>
                                        {
                                            (relationLoading)   ? "Loading" 
                                            : 
                                            followButtonText
                                        }
                                        </button>
                                )}
        
                                <button onClick={handleChatButtonClick} class='profile-btn'>Chat</button>
                            </div>
                            
                        </div>
                    </div>
                    {openUpdate &&  <Update setOpenUpdate={setOpenUpdate} user = {userData} />}


                    {/* Message Requests */}
                    <div>
                        {(!isLoading && !relationLoading && userData && currentUser && (userData.id === currentUser.id) )
                        ?
                        <InvitesContainer userId = {userData.id} /> 
                        :
                        <span>"No Requests"</span>
                        }
                    </div>
                   
                    
                    {/* To show only posts by user whos profile we viewing */}
                    <h2>Posts</h2> 
                    
                    {
                        userData && 
                        <Posts userId = {userData.id} />
                    }
                    
                </div>
            )}
        </>
    );
};

export default Profile;