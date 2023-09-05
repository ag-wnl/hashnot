import '../App.css';
import Navbar from '../components/Navbar';
import ExploreSearch from '../components/ExploreSearch';
import { useState } from 'react';
import { SearchResults } from '../components/SearchResults';
import Posts from '../components/Posts';


function Explore() {

    const [results, setResults] = useState([]);

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
                    
                    <button class = 'create-btn'>Create</button>
                </div>

                <Posts />
                
            </div>

        
        </>
    );
}

export default Explore;