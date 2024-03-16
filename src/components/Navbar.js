import { Link, useNavigate } from 'react-router-dom';
import '../components/component.css';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, ExternalLinkIcon, HamburgerIcon, UnlockIcon } from '@chakra-ui/icons';


function Navbar() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);
    let btn_text = 'Login';
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if(currentUser){
        btn_text = currentUser.username
    }


    const {logout} = useContext(AuthContext);
    
    const handleLogout = async() => {
        try{
            await logout();
            navigate("/")
        }catch(err) {
            console.log('error: ', err);
        }
    }

    return (
            <>
                <div class = 'navbar'>
                    
                    <div><Link to="/home" class = 'link-react' style={{fontSize:"26px"}}>hashnot</Link></div>
                    
                    {
                        !isMobile 
                        ? 
                        <ul class = 'nav-right'>
                        <li><Link to="/about" class = 'link-react'>About</Link></li>
                        <li>FAQ</li>
                        <li><Link to="/explore" class = 'link-react'>Explore</Link></li>                    


                        <Menu>
                            <MenuButton 
                            class = 'login-btn'
                            as={Button} rightIcon={<ChevronDownIcon />}>
                            {btn_text}
                            </MenuButton>
                            <MenuList>
                                <MenuItem 
                                icon={<ExternalLinkIcon />}
                                onClick={currentUser ? ()=> navigate(`/profile/${currentUser.username}`) :  ()=>navigate("/login")}
                                >{currentUser ? "Profile" : "Sign In"}</MenuItem>

                                <MenuItem
                                icon = {<UnlockIcon />}
                                onClick={handleLogout}
                                >Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </ul>
                    :
                    <div>
                        <HamburgerIcon 
                        boxSize={6} 
                        style={{cursor:'pointer'}}
                        ref={btnRef} colorScheme='teal' onClick={onOpen} />
                        
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>Hashnot</DrawerHeader>

                            <DrawerBody style={{display:'flex', flexDirection:'column', gap:'20px',
                        marginTop:'20px', fontWeight:'500'}}    >
                                <span class = 'mobile-nav-items'><Link to="/about" class = 'link-react'>About</Link></span>
                                
                                <span class = 'mobile-nav-items'><Link to="/explore" class = 'link-react'>Explore</Link></span>
                                
                                <span class = 'mobile-nav-items'>FAQ</span>
                                
                                <span>
                                    <Menu>
                                        <MenuButton 
                                        transition='all 0.2s'
                                        borderRadius='md'
                                        borderWidth='1px'
                                        _hover={{ bg: 'gray.400' }}
                                        _expanded={{ bg: 'blue.400' }}
                                        _focus={{ boxShadow: 'outline' }}
                                        as={Button} rightIcon={<ChevronDownIcon />}>
                                        {btn_text}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem 
                                            icon={<ExternalLinkIcon />}
                                            command='⌘T'
                                            onClick={currentUser ? ()=> navigate(`/profile/${currentUser.username}`) :  ()=>navigate("/login")}
                                            >Profile</MenuItem>

                                            <MenuItem
                                            icon = {<UnlockIcon />}
                                            onClick={handleLogout}
                                            >Logout</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </span>
                            </DrawerBody>

                            <DrawerFooter>
                                
                            </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    }
                    
                    
                </div>
            </>
    )
} 

export default Navbar;