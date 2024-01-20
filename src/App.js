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
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
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
