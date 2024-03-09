import Navbar from "../components/Navbar";
import '../App.css';
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Input } from "@chakra-ui/react";

function Login() {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            await login(inputs);
            navigate("/")
        }catch(err) {
            setErr(err.response.data);
        }
    }

    return (
        <>
            <Navbar />
            <div class = 'login-head'>
                <h1 style={{fontWeight:'700'}}>Welcome Back!</h1>

                <form class = 'register-card'>
                    <h3 style={{fontWeight:'500'}}>Log into your Account</h3>
                    
                    <Input width='320px' focusBorderColor='purple.400' type="text" placeholder="Email" name="email" onChange={handleChange}/>
                        
                    <Input width='320px'type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        
                    {err && <p className="error-message">{err}</p>}
                    <button class="banner-btn" onClick={handleLogin}>Let's go</button>

                    <Link to='/register' class = 'link-react'>
                        <span class = 'login-bottom-text'>Dont have an account? <b>Register here</b></span>
                    </Link>
            
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;