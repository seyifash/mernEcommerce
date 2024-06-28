import React, {useState, useEffect} from 'react';
import  { Link, useLocation } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import './NavBar.css'

const NavBar = () => {

    const [menu, setMenu] = useState(false);
    const [menu2, setMenu2] = useState(false);
    const location = useLocation();

    const { ref, inView } = useInView({
        threshold: 0.2
    });

    const handleMenuVisibility = () => {
        setMenu(true)
    }
    const handleMenuHidden = () => {
        setMenu(false)
    }
    const handleMenuVisibility2 = () => {
        setMenu2(true)
    }
    const handleMenuHidden2 = () => {
        setMenu2(false)
    }

    useEffect(() => {
        setMenu(false);
    }, [location]);

  return (
    <header className="nav">
        <ul className={`nav1 ${menu ? 'active' : ''} `} ref={ref} >
            <li className="cancel" onClick={handleMenuHidden}><i class='bx bx-x'></i></li>
            <li>
                <Link className={inView ? 'inView' : ''} to='/'>Home</Link>
            </li>
            <li>
                <Link className={inView ? 'inView' : ''} to='/shop/Home'>About us</Link>
            </li>
            <li >
                <Link className={inView ? 'inView' : ''} to='/shop/blog'>Blog</Link>
            </li>
            <li >
                <Link  className={inView ? 'inView' : ''} to='/shop/blog'>Contact us</Link>
            </li>
        </ul>
        <div className="menu1" onClick={handleMenuVisibility}><i class='bx bx-menu'></i></div>
        <div className="img">
        </div>
        <ul className={`nav2 ${menu2 ? 'active' : ''} `}>
        <li className="cancel2" onClick={handleMenuHidden2}><i class='bx bx-x'></i></li>
            <li>
                <Link to='/'>Login</Link>
            </li>
            <li className="sign">
                <Link to='/about'>Sign-up</Link>
            </li>
        </ul>
        <div className="menu2" onClick={handleMenuVisibility2}><i class='bx bxs-user-detail'></i></div>
    </header>
  )
}

export default NavBar