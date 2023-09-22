import Navbar from "../components/Navbar";
import '../App.css';
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {

    const [inputs, setInputs] = useState({
        username: "",
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
                <h2>Welcome Back!</h2>

                <form class = 'register-card'>
                    <h3>Log into your Account</h3>
                    <input class='register-field' type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        
                    <input class='register-field' type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        
                    {/* {err && err} */}
                    <button class="login-page-btn" onClick={handleLogin}>Login</button>

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