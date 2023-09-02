import Navbar from "../components/Navbar";
import '../App.css';
import { useState } from "react";
import axios from "axios";

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
            <div class = 'account-head'>
                <h1>Register Account</h1>

                <form class = 'register-card'>
                        <input class='register-field' type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input class='register-field' type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input class='register-field' type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <input class='register-field' type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        {/* {err && err} */}
                        <button class="create-btn" onClick={handleClick}>Register</button>
                </form>

            </div>
        </>
    )
}

export default Register;