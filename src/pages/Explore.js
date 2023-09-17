import '../App.css';
import Navbar from '../components/Navbar';
import ExploreSearch from '../components/ExploreSearch';
import { useState } from 'react';
import { SearchResults } from '../components/SearchResults';
import Posts from '../components/Posts';
import Share from '../components/Share';
import SidePosts from '../components/SidePosts';
import Footer from "../components/Footer";
import {FaSearch} from "react-icons/fa"
import { useQueries, useQuery } from 'react-query';
import { makeRequest } from '../axios';
import Post from '../components/Post';
import NoResult from '../components/NoResult';

function Explore() {

    const [results, setResults] = useState([]);
    const [sharePostOpen, setsharePostOpen] = useState(false);
    const [search, setSearch] = useState("")
    
    const {isLoading, error, data} = useQuery({
        queryKey: ['search', search],
        queryFn: () => makeRequest.get("/search?q="+search).then(res => {
            return res.data;
        })
    });
    console.log(data);

    return (
        <>
            <Navbar />
            <div class = 'account-head'>
                <div class = 'explore-header'>
                    <h2>Join teams or create one!</h2>
                    <div class = 'search-bar'>
                        {/* <ExploreSearch setResults={setResults} />
                        <SearchResults  results = {results} /> */}
                        <div class = 'search-wrap' >
                            <FaSearch class = 'search-icon' />
                            <input placeholder="Search Posts" 
                            onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                        
                    <button class = 'create-btn' 
                    onClick={() => setsharePostOpen(!sharePostOpen)}>Create Post</button>
                </div>
                {
                    sharePostOpen && <Share />
                }
                <div class = 'side-by-side-posts'>
                    
                    {/* Fetching posts according to search result, or if not then default posts */}
                    <div>
                        {(search === "" && <Posts />)}
                        {(isLoading) ? "Loading Search Results..." 
                        : 
                        ( (data.length === 0) ? <NoResult searchQ = {search} />
                        : data.map((post) => <Post post={post}  key={post.id} />))}
                    </div>
                    <div>
                        <SidePosts />
                    </div>
                </div>
                  
            </div>     
            <Footer />
        </>
    );
}

export default Explore;