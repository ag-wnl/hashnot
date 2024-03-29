import React from 'react'
import '../components/component.css';
import { useQuery} from 'react-query'
import { makeRequest } from "../axios"
import HackathonCard from './HackathonCard';
import { Spinner } from '@chakra-ui/react';


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

                    <h3 style={{fontSize:"18px", paddingBottom:"10px", borderBottom:"1px solid #4750ad"}}>Explore Hackathons</h3>

                   
                    {/* Hackathon Cards for right side view */}
                    { hackathonDataLoading ? <Spinner />
                    : 
                    data &&
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