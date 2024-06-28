import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const AdminItem = ({ id, icon, name, link }) => {
    return (
        link === '/logout' ? (
            <li >
                <Link to={link} >
                    <span className="icon">{icon}</span>
                    <span className="title">{name}</span>
                </Link>
            </li>
        ) : (
            <li >
                <Link to={link} >
                    <span className="icon">{icon}</span>
                    <span className="title">{name}</span>
                </Link>
            </li>
        )
    );
};

AdminItem.propTypes = {
    id: PropTypes.number,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default AdminItem;