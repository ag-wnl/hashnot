import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import '../App.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import userimg from "../imgs/user.png"
import git_img from "../imgs/github-png.png"
import website_img from "../imgs/link.svg"
import Posts from '../components/Posts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Update from '../components/Update';
import InvitesContainer from '../components/InvitesContainer';
import { Avatar, Button, Spinner, Tooltip } from '@chakra-ui/react'
import { getAuthHeader } from "../context/authHeader.js"
import axios from 'axios';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { userName } = useParams();   
    const userId = currentUser?.userId;
    
    const [openUpdate, setOpenUpdate] = useState(false);
    const [profileUserId, setProfileUserId] = useState(null);
    const [followButtonText, setFollowButtonText] = useState(
        currentUser?.following?.includes(profileUserId) ? "Following" : "Follow"
      );
    const [profileData, setProfileData] = useState();
    const [currentUserOwnProfile, setCurrentUserOwnProfile] = useState(false);
    const [followingUser, setFollowingUser] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        const fetchProfileData = async() => {
            const authHeader = await getAuthHeader();
            try {
                setLoadingState(true);
                const profileUserData = await axios.get(`http://localhost:8800/api/users/findUserByUserName/${userName}`, {
                    headers: {Authorization: authHeader},
                });
                setProfileData(profileUserData.data);
                setProfileUserId(profileUserData.data.id);
                console.log(profileUserData.data);

                const profileUserRelationData = await axios.get(`http://localhost:8800/api/relations?followedUserId=${profileUserData.data.id}`, {
                    headers: {Authorization: authHeader},
                });

                console.log(profileUserRelationData.data);

                if(userId && profileUserData.data.id === userId) {
                    setCurrentUserOwnProfile(true);
                }
                if(userId && profileUserRelationData.data.includes(userId)) {
                    setFollowingUser(true);
                } else {
                    setFollowingUser(false);
                }

                setLoadingState(false);
            } catch (error) {
                console.log("Error in fetching profile and relation data: ", error);
                setLoadingState(false);
            }
        }

        fetchProfileData();
    }, [userName, userId]);


    useEffect(() => {
        if(followingUser) {
            setFollowButtonText("Following")
        } else {
            setFollowButtonText("Follow")
            
        }
    }, [followingUser])


    const handleFollow = async() => {
        try {

            if (!profileUserId) {
                console.error("Profile user ID not found.");
                return;
            }

            const authHeader = await getAuthHeader();
            const config = { headers: { Authorization: authHeader } };
            
            if(followingUser) {
                axios.delete(`http://localhost:8800/api/relations?userId=${profileUserId}&curUserId=${userId}`, config)
                .then(() => {
                    console.log("unfollowed");
                    console.log('profile User id: ' ,profileUserId);
                    console.log('user id : ', userId);
                    setFollowingUser(!followingUser)
                });

            } else {
                axios.post(`http://localhost:8800/api/relations?userId=${profileUserId}&curUserId=${userId}`, config)
                .then(() => {
                    console.log("followed");
                    setFollowingUser(!followingUser)
                });
            }
        } catch (error) {
            console.error("Error during follow/unfollow request:", error);
        }
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
            {loadingState ? <div class = 'profile-page'><Spinner /></div>
            : (
                profileData && userId &&
                <div class = 'profile-page'>
                    <div class = 'profile-cards-row'>
                        <div class = 'profile-card'>
                            <div class = 'profile-row'>                                
                                {profileData.pfp ? 
                                
                                <Avatar name={profileData.name} src={profileData.pfp} />
                                :
                                <Avatar 
                                name="Display Picture"
                                src={userimg} />}
                                
                                <h2 style={{fontWeight:'500'}}>@{profileData.username}</h2>
                                
                                {/* Edit or Update Profile */}
                                {(currentUserOwnProfile)
                                    && (
                                    <Tooltip label='Edit'>
                                        <EditIcon 
                                        style={{cursor:'pointer'}}
                                        size='sm' onClick={()=>setOpenUpdate(!openUpdate)} />
                                    </Tooltip>
                                    )}
                            </div>
                            <div class = 'profile-row'>
                                <span style={{fontWeight:'500'}}>{profileData.name}</span>
                            </div>
                            
                            {(profileData.about) && <span>{profileData.about}</span>}
                            
                            <div class = 'profile-links'>
                                {(profileData.github) &&
                                <Link 
                                style={{color:"white"}}
                                to='https://google.com/'>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img 
                                    alt = 'github'
                                    style={{width:'30px'}}
                                    src={git_img} />
                                    <b>Github: </b>{profileData.github}</span>
                                </Link>
                                }

                                {(profileData.website) &&
                                <Link 
                                style={{color:'white'}}
                                to='https://google.com/'>
                                    <span  style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                    <img
                                    alt = 'website'
                                    style={{width:'30px'}}
                                    src={website_img} />
                                    <b>Website: </b>{profileData.website}</span>
                                </Link>
                                }
                            </div>
                        </div>
                        
                        {/* right side of the page */}
                        <div class = 'other-utils'>
                            <h2 style={{fontWeight:'500'}}>Showcase</h2>
                            <div class = 'showcase'>
                                {profileData.about}
                            </div>
                            <span style={{fontSize:'14px'}}><b>Skills: </b>C++, JavaScript, Data Science, Databases</span>
                            
                            <div class = 'profile-row'>

                                {/* This is the follow/following button section" */}
                                { profileUserId && userId && !currentUserOwnProfile
                                    && 
                                    <Button
                                    onClick={handleFollow}>
                                        {followButtonText}
                                    </Button>
                                }

                                {
                                    !currentUserOwnProfile && 
                                    <Button 
                                    onClick={handleChatButtonClick}>Chat</Button>
                                }
                                
                            </div>
                            
                        </div>
                    </div>
                    {openUpdate &&  <Update setOpenUpdate={setOpenUpdate} user = {profileData} />}


                    {/* Message Requests */}
                    <div>
                        {(!loadingState && profileData && currentUser && (profileData.id === userId) )
                        &&
                        <InvitesContainer userId = {userId} /> 
                        }
                    </div>
                   
                    
                    {/* To show only posts by user whos profile we viewing */}
                    <h2 style={{marginTop:'50px', fontWeight:'500'}}>Posts</h2> 
                    
                    {
                        profileData && 
                        <Posts userId = {profileData.id} onlyShowCurrentUserPosts = {true} />
                    }
                    
                </div>
            )}
        </>
    );
};

export default Profile;