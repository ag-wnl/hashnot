import React, { useState } from "react";
import {FaSearch} from "react-icons/fa"
import '../components/component.css';
import { useQuery } from 'react-query'
import { makeRequest, axios } from "../axios"



// This is the search bar for the explore

function ExploreSearch({ setResults }) {

    const [input, setInput] = useState("")

    //fetching data from API
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then(json => {
            const results = json.filter((user) => {
                return value &&  user && user.name && user.name.toLowerCase().includes(value)
            });
            setResults(results);
        });
    }
    //checking when searchbar text changes
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <>
            <div class = 'search-wrap' >
                <FaSearch class = 'search-icon' />
                <input placeholder="Search Posts" 
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                />
            </div>
        </>
    );
}

export default ExploreSearch;