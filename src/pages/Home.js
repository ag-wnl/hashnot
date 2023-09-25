import Navbar from "../components/Navbar";
import banner_frame from '../imgs/banner_frame.png';
import '../App.css';
import open_lnk from '../imgs/open_link.svg';
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import CustomizedTimeline from "../components/Timeline";


function Home() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    return (

        <>
            <div>
                <Navbar /> 
                <div class = 'banner'>
                    <h1 class = 'banner-main-text'>Find your Dream Team and Create a Better Future</h1>
                    <span class = 'banner-sub-text'>Find the perfect team to join and develop amazing things</span>
                    <span class = 'banner-sub-text'>no boundaries when it comes to tech</span>

                    <button 
                    onClick={()=> navigate(`/register`)}
                    class = 'banner-btn'>Join now</button>

                    <img class = 'banner-frame' src = {banner_frame}/>
                </div>

                <div class = 'section-below-banner'>
                    <div class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Start the Journey</strong></span>
                        <span class = 'banner-sub-text'>Discover teams who are looking for exactly someone like you and hack the planet!</span>
                        <span class = 'go-btn'>
                            Let's Start!
                            <img src = {open_lnk}/>
                        </span>
                    </div>

                    <div class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Find the Team</strong></span>
                        <span class = 'banner-sub-text'>Filter out posts to see exactly what you want and send a request!</span>
                        <span class = 'go-btn'>
                            Let's Explore!
                            <img src = {open_lnk}/>
                        </span>
                    </div>

                    <div class = 'sq-box'>
                        <span style={{fontSize:'20px'}}><strong>Become a Part</strong></span>
                        <span class = 'banner-sub-text'>Send request to join a team and chat with the Original Poster!</span>
                        <span class = 'go-btn'>
                            Let's Go!
                            <img src = {open_lnk}/>
                        </span>
                    </div>
                    
                </div>

                <div class = 'timeline-block'>
                    <div style={{display:'flex', flexDirection:'column', width:'60%'}}>
                        <h1>There are always people looking for you!</h1>
                        <span style={{fontSize:'20px'}}>There are people looking for exactly someone like you to join them and work on amazing projects</span>
                        <button class='get-started-btn'>Get Started</button>
                    </div>
                    <CustomizedTimeline />
                </div>

                <Footer />
                
            </div>
        
        </>

    );
}

export default Home;