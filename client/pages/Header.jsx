import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="hNav">
        <ul className="hUi">
          <li className="hLi">
            <Link to="/">Popular</Link>
          </li>
          <li className="hLi">
            <Link to="/about-us">About us</Link>
          </li>
          <li className="hLi">
            <Link to="/donate">Donate</Link>
          </li>
          <li className="hLi">
            <Link to="/categories">Categories</Link>
          </li>          
          <li className="hLi">
            <Link to="/withlist">Withlist</Link>
          </li>
          <li className="hLi">
            <Link to="/card">Card</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
