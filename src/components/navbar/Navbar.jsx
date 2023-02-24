import React, { useState } from 'react';
import PlaceholderIcon from "../../assets/placeholder_icon.svg"
import "./Navbar.css";
import { NavLink } from 'react-router-dom';

const Navicon = (props) => {
    return (
        <img src={props.icon}
            alt={props.icon}
            className={"navIcon"
                + (props.disabled ?
                    " disabled" : "")
            }
            onClick={props.onClick ? props.onClick : null} />
    )
}

const Navbar = (props) => {
    return (
        <div className='navContainer'>
            <NavLink to="/" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={PlaceholderIcon} />
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={PlaceholderIcon} />
            </NavLink>
            <NavLink to="/chorus" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={PlaceholderIcon} />
            </NavLink>
            <NavLink to="/library" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={PlaceholderIcon} />
            </NavLink>
        </div>
    )
}

export default Navbar;