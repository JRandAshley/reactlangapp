import React from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
//import { whileStatement } from '@babel/types';

function Nav() {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/phonemes">
                    <li>Phonemes</li>
                </Link>
                <Link style={navStyle} to="/testing">
                    <li>Testing</li>
                </Link>
            </ul>
        </nav>
    );
}
export default Nav;