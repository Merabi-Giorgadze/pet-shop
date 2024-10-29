import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">All Animal</Link>
          </li>
          <li>
            <Link to="/add-animals">Add Animal</Link>
          </li>
          <li>
            <Link to="/categorieslist">All Categories</Link>
          </li>
          <li>
            <Link to="/categories">Add Categories</Link>
          </li>          
          <li>
            <Link to="/CategAndAnim">All Animals with categories</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
