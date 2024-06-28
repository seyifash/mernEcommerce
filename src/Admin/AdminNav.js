import React from 'react';
import './Admin.css';
import  { adminBarItem  }  from './adminBarItem';
import AdminItem from './AdminItem';


const AdminNav = ({toggle}) => { 
    const darkMode = true;

     
    return (
        <div className={`navigation ${toggle ? 'active' : ''}`}>
            <ul>
            {adminBarItem.map(item => (
                <AdminItem key={item.id} id={item.id} icon={item.icon} name={item.name} link={item.link} 
            />
                ))}
                <li className="mode">
                    <div className="mode-inner">
                        <div className="moon-sun">
                            <i class='bx bx-moon icon moon'></i>
                            <i class='bx bx-sun icon sun'></i>
                        </div>
                        <span className="mode-text text">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                        <div className="toggle-switch">
                            <span className="switch"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <span className="x"><i className='bx bx-x'></i></span>
        </div>
  )
}

export default AdminNav