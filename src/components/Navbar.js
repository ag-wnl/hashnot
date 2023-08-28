import { Link, useNavigate } from 'react-router-dom';
import '../components/component.css';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

    const {loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate();

    return (

            <>
            
                <div class = 'navbar'>
                    
                    <div><h2>hashnot</h2></div>
                    <ul class = 'nav-right'>
                        <li><Link to="/about" class = 'link-react'>About</Link></li>
                        <li>FAQ</li>
                        <li>Explore</li>
                        {/* <li>{isAuthenticated && <p>{user.name}</p>}</li> */}
                        {
                            isAuthenticated ? (
                                <button 
                                onClick={() => navigate("/account")}
                                class = 'login-btn'>{user.name}</button>
                            )
                            :
                            (<button 
                            onClick={() => loginWithRedirect()}
                            class = 'login-btn'>Login</button>)
                        }
                    </ul>
                </div>
            
            </>

    )
} 

export default Navbar;