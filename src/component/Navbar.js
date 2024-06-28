import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <header>
        <div className="marque">FREE SHIPPING ON ALL ORDERS OVER $100</div>
        <nav>
            <ul className="ul1">
                <li><Link>All Categories</Link></li>
                <li><Link>Men</Link></li>
                <li><Link>Women</Link></li>
                <li><Link>Journal</Link></li>
                <li><Link>Contact</Link></li>
            </ul>
            <span>ORCHEN</span>
            <ul className="ul2">
                <li><Link className="search"><i class='bx bx-search'></i></Link></li>
                <li><Link className="bag"><i class='bx bx-shopping-bag'></i></Link></li>
                <li><Link>Login</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar