
import '../App.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function About() {
    return (
        <>
            <Navbar />
            <div class = 'page-parent'>
                <div class = 'about'>
                    <h2 style={{fontWeight:'700'}}>About</h2>
                    <p style={{fontWeight:'500'}}>hashnot aims to help people across the globe to connect with talented individuals who share the same love for programming and building things as they. Solo programming can sometimes get a bit boring and you may feel like working alongside a group with a common goal is what you need. hashnot is exactly aimed to help you with that.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;