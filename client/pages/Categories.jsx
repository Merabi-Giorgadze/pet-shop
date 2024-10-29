import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showEasyCare, setShowEasyCare] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data.items);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = showEasyCare 
    ? categories.filter(category => category.easyCare) 
    : categories; 

  const handleCategoryClick = (category) => {
    navigate(`/shop/${category.title}`);
  };

  return (
    <div>
      <Header />
      <h1>All Categories</h1>
      <div className="categ">        
        <label>
          <input
            type="checkbox"
            checked={showEasyCare}
            onChange={() => setShowEasyCare(prev => !prev)} 
          />
          Show Easy Care Only
        </label>

        <input
          type="text"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Enter category title"
        />

        <ul >
          {filteredCategories.map(category => (
            <li 
              key={category._uuid}
              onClick={() => handleCategoryClick(category)}             
            >
              <h3>{category.title}</h3>
              <p>{category.descriptionCateg}</p>
              <p>Easy Care: {category.easyCare ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
