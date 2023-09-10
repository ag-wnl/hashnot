import { Link, useNavigate } from 'react-router-dom';
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


function Navbar() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    var btn_text = '';
    if(currentUser){
        btn_text = currentUser.name
    }

    return (

            <>
            
                <div class = 'navbar'>
                    
                    <div><Link to="/home" class = 'link-react'><h2>hashnot</h2></Link></div>
                    <ul class = 'nav-right'>
                        <li><Link to="/about" class = 'link-react'>About</Link></li>
                        <li>FAQ</li>
                        <li><Link to="/explore" class = 'link-react'>Explore</Link></li>                    
                           
                        <button 
                        class='login-btn'
                        // <Link to={`/profile/${post.userId}`}></Link>
                        onClick={currentUser ? ()=> navigate(`/profile/${currentUser.username}`) :  ()=>navigate("/login")}
                        >{btn_text}</button>
                    </ul>
                </div>
            
            </>

    )
} 

export default Navbar;