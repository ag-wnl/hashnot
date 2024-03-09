import '../App.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import Posts from '../components/Posts';
import Share from '../components/Share';
import SidePosts from '../components/SidePosts';
import Footer from "../components/Footer";
import { useQuery } from 'react-query';
import { makeRequest } from '../axios';
import Post from '../components/Post';
import NoResult from '../components/NoResult';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AddIcon, PhoneIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/react';


function Explore() {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId;
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
    
    const {isLoading, error, data, refetch } = useQuery({
        queryKey: ['search', search],
        // queryFn: () => makeRequest.get("/search?q="+search).then(res => {
        //     return res.data;
        // })
        queryFn: async() => {
            try {
                const response = await makeRequest.get("/search?q="+search);
                return response.data;
            } catch (error) {
                console.log("Error in fetching results: ", error);
            }
        },
        refetchOnWindowFocus: false 
    });

    return (
        <>
            <Navbar />
            <div class = 'page-parent'>
                
                <div class = 'explore-header'>
                    <h2 style={{fontWeight:'700'}}>Explore</h2>
                    
                    {/* <div class = 'search-bar'>
                        <ExploreSearch setResults={setResults} />
                        <SearchResults  results = {results} />
                        <div class = 'search-wrap' >
                            <SearchIcon />
                            <input placeholder="Search" 
                            onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div> */}

                    <div>
                        <InputGroup>
                            <InputLeftAddon>
                                <Search2Icon />
                            </InputLeftAddon>
                            <Input 
                            onChange={(e) => setSearch(e.target.value)}
                            type='text' placeholder='Search' />
                        </InputGroup>

                    </div>

                    <Button 
                    leftIcon={<AddIcon />}
                    style={{borderRadius:'60px'}}
                    onClick={() => setsharePostOpen(!sharePostOpen)}>
                        Create
                    </Button>
                    {/* <button class = 'create-btn' 
                    onClick={() => setsharePostOpen(!sharePostOpen)}>Create Post</button> */}
                </div>
                {
                    sharePostOpen && <Share />
                }


                <div class = 'side-by-side-posts'> 

                    {/* search Filters */}
                    <div class = 'filter-parent-box'>
                        <div class = 'filter-container'>
                            <span 
                            style={{fontSize:'20px', borderBottom:'1px solid #4750ad', paddingBottom:'8px'}}>
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
                                {skills && skills.map((skill, index) => (
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
                        {userId && currentUser && (search === "") && <Posts userId = {userId} sorted = {sorter} aim = {objective} domains = {skillString} teamSize = {sliderValue} />}

                        
                        {(isLoading) ? "Loading ..."
                        : 
                        ( data && (search !== "" && data.length === 0) ? <NoResult searchQ = {search} />
                        : (data && data.map((post) => <Post post={post}  key={post.id} />)))}
                    </div>
                    
                    {/* Side posts : for ads and hackathon promos */}
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