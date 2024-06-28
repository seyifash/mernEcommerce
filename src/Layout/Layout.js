import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import AdminNav from '../Admin/AdminNav';
import './layout.css'

const Layout3 = () => {

    const [toggle , setToggle] = useState(false);
    const [active, setActive] = useState(false)

    const handleToggle = () => {
        setToggle(prevState => !prevState);
        setActive(prevState => !prevState)
    }
    return (
        <div className='container'>
            <AdminNav  toggle={toggle}/>
            <main className={`main ${toggle ? 'active' : ''}`}>
            <span className={`tg ${active ? 'active' : ''}`} onClick={handleToggle}>
                <i className="bx bxs-chevron-left"></i>
            </span>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout3