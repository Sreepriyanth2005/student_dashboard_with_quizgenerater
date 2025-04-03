import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Student Login</Link></li>
        <li><Link to="/student/register">Student Register</Link></li>
        <li><Link to="/teacher/login">Teacher Login</Link></li>
        <li><Link to="/teacher/register">Teacher Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
