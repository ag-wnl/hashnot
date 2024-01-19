import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import Chats from './pages/Chats';
import { ChakraProvider } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOFmnkTjts4hEpC2adbmio7pnwzARntYI",
  authDomain: "social-network-hashnot.firebaseapp.com",
  projectId: "social-network-hashnot",
  storageBucket: "social-network-hashnot.appspot.com",
  messagingSenderId: "447512735402",
  appId: "1:447512735402:web:967f3aff4b92d6e709ead3",
  measurementId: "G-D1EXMKDTWL"
};

const app = initializeApp(firebaseConfig);

function App() {

  const queryClient = new QueryClient()

  return (
    
  <QueryClientProvider client={queryClient}>
      <>
        <div>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route index element = {<Home />} />
                <Route path='/home' element = {<Home />} />
                <Route path='/about' element = {<About />} />
                <Route path='/chats' element = {<Chats />} />
                <Route path='/account' element = {<Account />} />
                <Route path='/explore' element = {<Explore />} />
                <Route path='/register' element = {<Register />} />
                <Route path='/login' element = {<Login />} />
                <Route path='/profile/:userName' element = {<Profile />} />
              </Routes>
            </BrowserRouter>  
        </div>
      </>
    </QueryClientProvider>
  );
}

export default App;
