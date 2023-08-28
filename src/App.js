import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';

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
            </Routes>
          </BrowserRouter>  
      </div>
    </>
  );
}

export default App;
