import Navbar from "../components/Navbar";
import '../App.css';
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

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
            <div class = 'account-head'>
                <h1>Login to your Account</h1>

                <form class = 'register-card'>
                        <input class='register-field' type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        
                        <input class='register-field' type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        
                        {/* {err && err} */}
                        <button class="create-btn" onClick={handleLogin}>Login</button>
                </form>

            </div>
        </>
    )
}

export default Login;