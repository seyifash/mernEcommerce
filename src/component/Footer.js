import React from 'react';
import logo from '../assets/landingPage/blacklogo.png'
import './Footer.css';
import {Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className="logo">
            <div className="img">
                <img src={logo} alt="logo"/>
            </div>
            <p>21, udeh street,<br />
            fagba Agege, Lagos.</p>
            <br/> 
            <span className="email">orchen@gmail.com</span>
            <br/> 
            <br/> 
            <br/> 
            <div class="icons">
                <span><Link to=""><i className='bx bxl-instagram-alt'></i></Link></span>
                <span><Link to=""><i className='bx bxl-linkedin'></i></Link></span>
                <span><Link to=""><i className='bx bxl-twitter'></i></Link></span>
                <span><Link to=""><i className='bx bxl-facebook'></i></Link></span>
            </div>
        </div>
        <div className="home">
            <h4>Menu</h4>
            <span>Home</span>
            <span>Membership</span>
            <span>About</span>
            <span>Blog</span>
        </div>
        <div className="home nth">
        <h4>Quick Links</h4>
            <span>Login</span>
            <span>Register</span>
            <span>Contact us</span>
            <span>Privacy Policy</span>
        </div>
        <div className="home nth">
            <h4>Operational</h4>
            <span>Everyday: 9:00AM - 10:00PM</span>
            <span>Sat - Sun: 9:00AM - 2:00PM</span>
            <h4>You need a consult?</h4>
            <span>+23410234557</span>
        </div>
    </footer>
  )
}

export default Footer