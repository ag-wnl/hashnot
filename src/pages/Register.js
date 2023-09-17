import Navbar from "../components/Navbar";
import '../App.css';
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Register() {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [err, setErr] = useState(null);
    

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault()

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs)
        }catch(err){
            setErr(err.response.data);
        }

    }

    return (
        <>
            <Navbar />
            <div class = 'login-head'>
                <h2>Register Account</h2>

                <form class = 'register-page-card'>
                        <h3>Join the Community!</h3>
                        <input class='register-field' type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input class='register-field' type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input class='register-field' type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <input class='register-field' type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        {/* {err && err} */}
                        <button class="login-page-btn" onClick={handleClick}>Register</button>
                        
                        <Link to='/login' class = 'link-react'>
                            <span class = 'login-bottom-text'>Already have an account? <b>Sign In</b></span>
                        </Link>
                </form>

            </div>
            <Footer />
        </>
    )
}

export default Register;