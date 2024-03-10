import Navbar from "../components/Navbar";
import '../App.css';
import { useContext, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { AuthContext } from "../context/authContext";

function Register() {

    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try{
            await signup(inputs);
            navigate("/");
        }catch(err) {
            setErr(err.response.data);
        }
        
    }

    return (
        <>
            <Navbar />
            <div class = 'login-head'>
                <h2 style={{fontWeight:'700'}}>Join the Community!</h2>
                
                <form class = 'register-card'>
                    <Input width='320px' variant='filled' class='register-field' type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <Input width='320px' variant='filled' class='register-field' type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <Input width='320px' variant='filled' class='register-field' type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <Input width='320px' variant='filled' class='register-field' type="text" placeholder="Name" name="name" onChange={handleChange}/>
                    {/* {err && err} */}
                    <button class="banner-btn" disabled={loading} onClick={handleClick}>{loading ? "Registering..." : "Register"}</button>
                    
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