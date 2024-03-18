import Navbar from "../components/Navbar";
import '../App.css';
import open_lnk from '../imgs/open_link.svg';
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import userProfileGraphic from "../imgs/userProfileGraphic.png"
import codingAlone from "../imgs/codingAlone.png"
import explorePostGraphic from "../imgs/postsGraphic.png"
import explorePagePhoneGraphic from "../imgs/phone-mockup.png"

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
                            <span>make magic happen</span>    
                        </h1>
                        <span class = 'banner-sub-text'>
                            Discover talented teams and passionate individuals, no boundaries when it comes to tech</span>
                        <button 
                        onClick={()=> navigate(`/register`)}
                        class = 'banner-btn'>Get Started</button>

                        {/* <img class = 'banner-frame' src = {banner_frame}/> */}
                    </div>

                </div>
                

                <div class = 'timeline-block'>
                    <div class = 'banner-column-sub-section'>
                        <div>
                            <span class = 'headings'>Find amazing people</span>
                        </div>
                        
                        <div>
                            <span style={{fontSize:'18px', color:'grey'}}>
                            Looking to shake things up and collaborate with some awesome peeps? Find awesome folks who share your passion and drive.
                            </span>
                        </div>
                        
                        <div>
                        <button 
                        onClick={()=> navigate(`/explore`)}
                        class='banner-btn'>Start exploring</button>
                        </div>
                        
                    </div>
                    <div>
                        <img class = 'home-show-images' src={userProfileGraphic} />
                    </div>
                </div>


                <div class = 'timeline-block'>
                    
                    <div>
                        <img class='home-show-images' src={explorePagePhoneGraphic} />
                    </div>
                    <div class = 'banner-column-sub-section'>
                        <div>
                            <span class = 'headings'>Sick of flying solo? </span>
                        </div>
                        
                        <div>
                            <span style={{fontSize:'18px', color:'grey'}}>
                            Join the party and connect with fellow creatives, techies, and dreamers. 
                            You'll make connections, swap ideas, and crush it together!
                            </span>
                        </div>
                        
                        <div>
                        <button 
                        onClick={()=> navigate(`/explore`)}
                        class='banner-btn'>Start exploring</button>
                        </div>
                        
                    </div>
                    
                </div>


                <div class = 'timeline-block'>
                    <div class = 'banner-column-sub-section'>
                        <div>
                            <span class = 'headings'>Ready to get in on the fun?</span>
                        </div>
                        
                        <div>
                            <span style={{fontSize:'18px', color:'grey'}}>Dive in and start mingling with potential teammates. Make some memories and build something awesome together!</span>
                        </div>
                        
                        <div>
                        <button 
                        onClick={()=> navigate(`/explore`)}
                        class='banner-btn'>Start exploring</button>
                        </div>
                    </div>

                    <div>
                        <img class = 'home-show-images' style={{borderRadius:'35px'}} src={codingAlone} />
                    </div>
                    
                </div>                
            </div>
            <Footer />
        </>

    );
}

export default Home;