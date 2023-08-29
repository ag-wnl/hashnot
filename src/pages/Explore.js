import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/Navbar';
import ExploreSearch from '../components/ExploreSearch';
import { useState } from 'react';
import { SearchResults } from '../components/SearchResults';


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
                
            </div>

        
        </>
    );
}

export default Explore;