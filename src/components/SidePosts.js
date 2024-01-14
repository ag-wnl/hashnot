import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import Messages from './Messages';
import userimg from "../imgs/user.png"
import upvote from "../imgs/up.svg"
import banner_img from "../imgs/hackathon_banner.png"

function SidePosts() {
    return (
        <>
                <div class = 'side-post-container'>
                    <img 
                    style={{width:'300px', paddingBottom:'15px', borderBottom: '1px solid #727372'}}
                    src={banner_img} />
                    Explore the nexus of people looking to work towards solving problems and winning big!
                </div>
        </>
    )
}

export default SidePosts