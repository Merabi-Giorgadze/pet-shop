import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const animalCount = useSelector(state => state.animal?.selectedAnimals?.length || 0);
  const cardCount = useSelector(state => state.wishlist.wishlist.length || 0); 
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
            <Link to="/withlist">Withlist<p className={animalCount > 0 ? '' : 'hidden'}>{animalCount}</p></Link>
          </li>
          <li className="hLi">
            <Link to="/card">Card<p className={cardCount > 0 ? '' : 'hidden'}>{cardCount}</p></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
