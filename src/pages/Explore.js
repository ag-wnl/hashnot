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
import notificationIcon from '../imgs/notification-icon.png'

function Explore() {

    const [sharePostOpen, setsharePostOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState("")
    const [skills, setSkills] = useState([]);
    const [objective, setObjective] = useState("");
    const [sliderValue, setSliderValue] = useState(1);

    const handleClearBtnClick = () => {
        setSkills([]);
        setObjective("");
        setSliderValue(1);
    }

    let skillString = skills.join(',');

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleSortChange = (e) => {
        setSorter(e.target.value);
    }
    const handleObjectiveChange = (e) => {
        setObjective(e.target.value);
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

    const noObjectiveClick = () => {
        setObjective("");
        console.log("emptied!")
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
                    
                    <div class="custom-tooltip" title="Notifications">
                        <img style={{width:"30px"}} src = {notificationIcon} />
                    </div>

                    <button class = 'create-btn' 
                    onClick={() => setsharePostOpen(!sharePostOpen)}>Create Post</button>
                </div>
                {
                    sharePostOpen && <Share />
                }


                <div class = 'side-by-side-posts'> 

                    {/* search Filters */}
                    <div class = 'filter-parent-box'>

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
                                        <option class = 'sort-selection' selected="selected" disabled >No Selection</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="machine-learning">Machine Learning</option>
                                        <option value="mobile-app-dev">Mobile App Development</option>
                                        <option value="devops">DevOps</option>
                                        <option value="database-mgmt">Database Management</option>
                                        <option value="data-science">Data Science</option>
                                        <option value="cloud-computing">Cloud Computing</option>
                                        <option value="cybersecurity">Cybersecurity</option>
                                        <option value="blockchain-dev">Blockchain Development</option>
                                        <option value="game-dev">Game Development</option>
                                        <option value="fintech">FinTech</option>
                                        <option value="bioinformatics">Bioinformatics</option>
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

                            <div class = 'filter-row'>
                                <p>Team Size</p>

                                <input 
                                class = 'number-req-selector-filter'
                                onChange={handleSliderChange}
                                type="range" 
                                id="slider"
                                value={sliderValue}
                                defaultValue={1} 
                                min="1" max="12" step="1"/>
                                <div className="slider-container">
                                    <span className="slider-value">{sliderValue}</span>
                                </div>
                            </div>

                            <div class='filter-row'>
                                <p>Objective</p> 

                                <form>                                
                                    <select name="sort" id="sort" value={objective} onChange={handleObjectiveChange}>
                                        <option class = 'sort-selection' value='nan'>No Selection</option>
                                        <option value="Hackathon">Hackathon</option>
                                        <option value="Project">Project</option>
                                    </select>
                                </form>

                            </div>

                            <div class = 'filter-row'>
                                <button onClick={handleClearBtnClick} class = 'clear-filter-btn'>Clear Filters</button>
                            </div>
                        </div>
                    </div>
                    
                    
                    {/* Fetching posts according to search result, or if not then default posts */}
                    <div>
                        {(search === "" && <Posts sorted = {sorter} aim = {objective} domains = {skillString} teamSize = {sliderValue} />)}
                        {(isLoading) ? "Loading Search Results..." 
                        : 
                        ( (search !== "" && data.length === 0) ? <NoResult searchQ = {search} />
                        : data.map((post) => <Post post={post}  key={post.id} />))}
                    </div>
                    <div class = 'side-post-parent'>
                        <SidePosts />
                    </div>
                </div>
                  
            </div>     
            <Footer />
        </>
    );
}

export default Explore;