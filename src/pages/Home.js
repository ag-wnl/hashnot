import Navbar from "../components/Navbar";




function Home() {
    return (

        <>
            <div>
                <Navbar /> 
                <div class = 'banner'>
                    <span class = 'banner-main-text'>Find your dream team and discover talented individuals across the globe</span>
                    <span class = 'banner-sub-text'>Create or join a team and create the future together, from anywhere</span>
                    <span class = 'banner-sub-text'>and with anyone</span>

                    <button class = 'banner-btn'>Join now</button>
                </div>
                
            </div>
        
        </>

    );
}

export default Home;