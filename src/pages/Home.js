import Navbar from "../components/Navbar";
import banner_frame from '../imgs/banner_frame.png';
import '../App.css';
import open_lnk from '../imgs/open_link.svg';
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


function Home() {

    const { currentUser } = useContext(AuthContext);

    return (

        <>
            <div>
                <Navbar /> 
                <div class = 'banner'>
                    <span class = 'banner-main-text'>Find your dream team and discover talented individuals across the globe</span>
                    <span class = 'banner-sub-text'>Create or join a team and create the future together, from anywhere</span>
                    <span class = 'banner-sub-text'>and with anyone</span>

                    <button class = 'banner-btn'>Join now</button>

                    <img class = 'banner-frame' src = {banner_frame}/>
                </div>

                <div class = 'section-below-banner'>
                    <div class = 'sq-box'>
                        <span><strong>Join a Team</strong></span>
                        <span class = 'banner-sub-text'>Discover teams who are looking for exactly someone like you and hack the planet!</span>
                        <span class = 'go-btn'>
                            Let's Go!
                            <img src = {open_lnk}/>
                        </span>
                    </div>

                    <div class = 'sq-box'>
                        <span><strong>Join a Team</strong></span>
                        <span class = 'banner-sub-text'>Discover teams who are looking for exactly someone like you and hack the planet!</span>
                        <span class = 'go-btn'>
                            Let's Go!
                            <img src = {open_lnk}/>
                        </span>
                    </div>

                    <div class = 'sq-box'>
                        <span><strong>Join a Team</strong></span>
                        <span class = 'banner-sub-text'>Discover teams who are looking for exactly someone like you and hack the planet!</span>
                        <span class = 'go-btn'>
                            Let's Go!
                            <img src = {open_lnk}/>
                        </span>
                    </div>
                    
                </div>

                <Footer />
                
            </div>
        
        </>

    );
}

export default Home;