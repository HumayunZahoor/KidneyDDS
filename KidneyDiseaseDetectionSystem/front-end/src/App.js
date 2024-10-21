import React from "react";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Menu from "./components/Menu";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Patient from "./components/Patient";
import Doctor from "./components/Doctor";
import UploadXray from "./components/UploadXray";
import ViewDetail from "./components/ViewDetail";
import ViewImage from "./components/ViewImage";
import Prescription from "./components/Prescription";
import MyRecord from "./components/MyRecord";
import Feedback from "./components/Feedback";
import UserFeedback from "./components/UserFeedback";
import './index.css';

function App() {
  return( 

    <>
    <Router>
    <Menu/>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/Blog" element={<Blog/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Doctor" element={<Doctor/>} />
      <Route path="/Patient" element={<Patient/>} />
      <Route path="/UploadXray" element={<UploadXray/>} />
      <Route path="/ViewDetail" element={<ViewDetail/>} />
      <Route path="/ViewImage" element={<ViewImage/>} />
      <Route path="/Prescription" element={<Prescription/>} />
      <Route path="/MyRecord" element={<MyRecord/>} />
      <Route path="/Feedback" element={<Feedback/>} />
      <Route path="/UserFeedback" element={<UserFeedback/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App;
