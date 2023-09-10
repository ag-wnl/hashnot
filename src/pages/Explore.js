import '../App.css';
import Navbar from '../components/Navbar';
import ExploreSearch from '../components/ExploreSearch';
import { useState } from 'react';
import { SearchResults } from '../components/SearchResults';
import Posts from '../components/Posts';
import Share from '../components/Share';
import SidePosts from '../components/SidePosts';
import Footer from "../components/Footer";

function Explore() {

    const [results, setResults] = useState([]);
    const [sharePostOpen, setsharePostOpen] = useState(false);

    return (
        <>
            <Navbar />
            <div class = 'account-head'>
                <div class = 'explore-header'>
                    <h1>Join teams or create one!</h1>
                    <div class = 'search-bar'>
                        <ExploreSearch setResults={setResults} />
                        <SearchResults  results = {results} />
                    </div>
                    
                    <button class = 'create-btn' 
                    onClick={() => setsharePostOpen(!sharePostOpen)}>Create</button>
                </div>
                {
                    sharePostOpen && <Share />
                }
                <div class = 'side-by-side-posts'>
                    <div>
                        <Posts />
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