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

    const [sharePostOpen, setsharePostOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState("")

    const handleSortChange = (e) => {
        setSorter(e.target.value);
    }
    
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

                    {/* search Filters */}
                    <div class = 'filter-container'>
                        <span 
                        style={{fontSize:'18px', borderBottom:'1px solid #4d4d4d', paddingBottom:'8px'}}>
                            Filters</span>
                        
                        <div class='filter-row'>
                            <p>Sort by</p> 
                            <form>
                                <label htmlFor='sort'></label>
                                
                                <select name="sort" id="sort" value={sorter} onChange={handleSortChange}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="recent">Most Recent</option>
                                    <option value="highest">Upvotes</option>
                                </select>
                            
                            </form>
                        </div>
                        <div class='filter-row'>
                            <p>Skills</p> 

                            <select name="sort" id="sort" value={sorter}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="recent">Web Development</option>
                                    <option value="highest">Machine Learning</option>
                                    <option value="highest">Mobile App Development</option>
                                    <option value="highest">DevOps</option>
                                    <option value="highest">Database Management</option>
                                    <option value="highest">Data Science</option>
                                    <option value="highest">Cloud Computing</option>
                                    <option value="highest">Cybersecurity</option>
                                    <option value="highest">Blockchain Development</option>
                                    <option value="highest">Game Development</option>
                                    <option value="highest">FinTech</option>
                                    <option value="highest">Bioinformatics</option>
                            </select>

                        </div>
                        <div class='filter-row'>
                            <p>Objective</p> 

                            <form>                                
                                <select name="sort" id="sort" value={sorter} onChange={handleSortChange}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="recent">Hackathons</option>
                                    <option value="highest">Project</option>
                                </select>
                            </form>

                        </div>
                        <div class='filter-row'>
                            <p>Experience Level</p> 

                            <form>                                
                                <select name="sort" id="sort" value={sorter}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="recent">Rookie</option>
                                    <option value="highest">Veteran</option>
                                    <option value="highest">Elite</option>
                                    <option value="highest">Pro</option>
                                    <option value="highest">Master</option>
                                </select>
                            </form>

                        </div>
                        <div class='filter-row'>
                            <p>Team Size</p> 
                            <p>Select Team Size</p>
                        </div>
                    </div>
                    
                    {/* Fetching posts according to search result, or if not then default posts */}
                    <div>
                        {(search === "" && <Posts sorted = {sorter} />)}
                        {(isLoading) ? "Loading Search Results..." 
                        : 
                        ( (search !== "" && data.length === 0) ? <NoResult searchQ = {search} />
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