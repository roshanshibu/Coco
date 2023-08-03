import React, { useState } from 'react';
import HomeIcon from "../../assets/home_icon.svg"
import SearchIcon from "../../assets/search_icon.svg"
import ChorusIcon from "../../assets/chorus_recom_icon.svg"
import LibraryIcon from "../../assets/library_icon.svg"
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
                <Navicon icon={LibraryIcon} />
            </NavLink>
            {/* <NavLink to="/search" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={SearchIcon} />
            </NavLink> */}
            <NavLink to="/chorus" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={ChorusIcon} />
            </NavLink>
            {/* <NavLink to="/library" className={({ isActive }) => { return isActive ? "navSelected" : "navUnselected" }}>
                <Navicon icon={LibraryIcon} />
            </NavLink> */}
        </div>
    )
}

export default Navbar;