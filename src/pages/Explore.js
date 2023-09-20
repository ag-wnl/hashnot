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
    const [skills, setSkills] = useState([]);


    const handleSortChange = (e) => {
        setSorter(e.target.value);
    }

    const handleSkillSelect = (selectedSkill) => {
        // Check if the selectedSkill is not already in the skills array
        if (!skills.includes(selectedSkill)) {
          // Add the selectedSkill to the skills array
          setSkills([...skills, selectedSkill]);
        }
    };

    const handleSkillClick = (clickedSkill) => {
        // Filter out the clicked skill and update the skills array
        const updatedSkills = skills.filter((skill) => skill !== clickedSkill);
        setSkills(updatedSkills);
    };
    
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

                            <select name="sort" id="sort" 
                            onChange={(e) => handleSkillSelect(e.target.value)}>
                                    <option class = 'sort-selection' >No Selection</option>
                                    <option value="webdev">Web Development</option>
                                    <option value="ml">Machine Learning</option>
                                    <option value="mobileapp">Mobile App Development</option>
                                    <option value="devops">DevOps</option>
                                    <option value="dbmgmt">Database Management</option>
                                    <option value="ds">Data Science</option>
                                    <option value="cloud">Cloud Computing</option>
                                    <option value="cybersec">Cybersecurity</option>
                                    <option value="blockchain">Blockchain Development</option>
                                    <option value="gamedev">Game Development</option>
                                    <option value="fintech">FinTech</option>
                                    <option value="bioinfo">Bioinformatics</option>
                            </select>
                        </div>

                        {/* displaying skills selected by user */}
                        <div class = 'skill-select-show'>
                            {skills.map((skill, index) => (
                                <span key={index}
                                title='Remove'
                                onClick={() => handleSkillClick(skill)}
                                className="selected-skill">
                                {skill}
                                </span>
                            ))}
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