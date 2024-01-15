import React, { useEffect, useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { makeRequest } from "../axios"
import moment from "moment";
import axios from 'axios';
import HackathonCard from './HackathonCard';



function SidePosts() {

    const url = "https://devpost.com/api/hackathons/";
    const { isLoading: hackathonDataLoading, error, data } = useQuery(["hackathon", url], () =>
        makeRequest.get("/hackathon?url=" + url).then((res) => {
            console.log(res.data);
            return res.data;
        })
    );

    return (
        <>
                <div class = 'side-post-container'>
                    {/* <img 
                    style={{width:'300px', paddingBottom:'15px', borderBottom: '1px solid #727372'}}
                    src={banner_img} />
                    Explore the nexus of people looking to work towards solving problems and winning big! */}

                    <h3>Top 5 Hackathons</h3>
                    
                    {/* Make sure all data loaded before mapping as useQuery is async  */}
                    {/* Hackathon Cards for right side view */}
                    { !hackathonDataLoading && data &&
                    (data.hackathons.map((hackathon, index) => (
                        
                        <HackathonCard
                        key={index} 
                        hackathon={hackathon}
                         />
                    )))
                    }
                </div>
        </>
    )
}

export default SidePosts