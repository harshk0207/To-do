import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import ChangePassword from './components/ChangePassword';
import WorkState from './context/works/WorkState';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <WorkState>
      <BrowserRouter>
      <Navbar/>
      <Alert/>
      <div className="container">
      <Routes> 
          <Route path="/" element={ <Home/> } />
          <Route path="/about" element={ <About/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/changePassword" element={ <ChangePassword/> } />
      </Routes> 
      </div>
      </BrowserRouter>
      </WorkState>
    </>
  );
}

export default App;


//issues

// Addwork dangers not working (in case of multitile and empty title ot desc)
//update work multi tiltle functionality 
//update work default general not setting
//update dangers not working (in case of multitile and empty title ot desc)