import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <div>
          <BrowserRouter>
            <Routes>
              <Route index element = {<Home />} />
              <Route path='/home' element = {<Home />} />
              <Route path='/about' element = {<About />} />
              <Route path='/account' element = {<Account />} />
              <Route path='/explore' element = {<Explore />} />
              <Route path='/register' element = {<Register />} />
              <Route path='/login' element = {<Login />} />
            </Routes>
          </BrowserRouter>  
      </div>
    </>
  );
}

export default App;
