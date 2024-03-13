import Navbar from "../components/Navbar";
import '../App.css';
import open_lnk from '../imgs/open_link.svg';
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    return (

        <>
            <Navbar />
            <div class = 'page-parent'> 

                <div style={{position:'relative'}}>
                    <div class = 'banner'>
                        <h1 class = 'banner-main-text'>
                            <span>Find your dream team</span>
                            <span>and start building</span>    
                        </h1>
                        <span class = 'banner-sub-text'>Find people trying to build things you would love to be a part of</span>
                        <span class = 'banner-sub-text'>no boundaries when it comes to tech</span>

                        <button 
                        onClick={()=> navigate(`/register`)}
                        class = 'banner-btn'>Get Started</button>

                        {/* <img class = 'banner-frame' src = {banner_frame}/> */}
                    </div>

                </div>
                

                <div class = 'section-below-banner'>
                    <div 
                    onClick={()=> navigate(`/register`)}
                    class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Start the Journey</strong></span>
                        <span class = 'banner-sub-text-box'>Discover people who are looking for exactly someone like you</span>
                        <span class = 'go-btn'>
                            Let's Start!
                            <img src = {open_lnk} alt = "banner"/>
                        </span>
                    </div>

                    <div 
                    onClick={()=> navigate(`/explore`)}
                    class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Find the Team</strong></span>
                        <span class = 'banner-sub-text-box'>Filter out posts to see exactly what you want and send a request!</span>
                        <span class = 'go-btn'>
                            Let's Explore!
                            <img src = {open_lnk}/>
                        </span>
                    </div>

                    <div 
                    onClick={()=> navigate(`/about`)}
                    class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Become a Part</strong></span>
                        <span class = 'banner-sub-text-box'>Send request to join a team and chat with the Original Poster!</span>
                        <span class = 'go-btn'>
                            Let's Go!
                            <img src = {open_lnk}/>
                        </span>
                    </div>
                    
                </div>

                <div class = 'timeline-block'>
                    <div class = 'banner-column-sub-section'>
                        <div>
                        <h1>There are always people looking for you!</h1>
                        </div>
                        
                        <div>
                        <span style={{fontSize:'20px'}}>There are people looking for exactly someone like you to join them and work on amazing projects</span>
                        </div>
                        
                        <div>
                        <button 
                        onClick={()=> navigate(`/explore`)}
                        class='banner-btn'>Start exploring</button>
                        </div>
                        
                    </div>
                    <div>
                        [TimeLine goes here]
                    </div>
                </div>

                <Footer />
                
            </div>
        
        </>

    );
}

export default Home;