import React from "react";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Menu from "./Menu";
import Contact from "./Contact";
import About from "./About";
import Home from "./Home";
import Blog from "./Blog";
import Signup from "./Signup";
import Login from "./Login";
import Doctor from "./Doctor";
import Patient from "./Patient";
import UploadXray from "./UploadXray";
import ViewDetail from "./ViewDetail";




const Fyp_Project = () => {
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
    </Routes>
    </Router>
    </>
  )
}
export default Fyp_Project;