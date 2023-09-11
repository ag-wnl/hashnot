
import '../App.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function About() {
    return (
        <>
            <Navbar />
            <div class = 'account-head'>
                <div class = 'about-main-box'>
                    <h2>About</h2>
                    <p>hashnot aims to help people across the globe to connect with talented individuals who share the same love for programming and building things as they. Solo programming can sometimes get a bit boring and you may feel like working alongside a group with a common goal is what you need. hashnot is exactly aimed to help you with that.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;