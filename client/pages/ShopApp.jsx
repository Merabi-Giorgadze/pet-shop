import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimalsByCategory } from '../api/api';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { addAnimal } from '../redux/actions';

const ShopApp = () => {
  const { categoryTitle } = useParams();
  const [animals, setAnimals] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalsData = await getAnimalsByCategory(categoryTitle);
        setAnimals(animalsData.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryTitle]);

  const filteredAnimals = animals.filter(animal => {
    return animal.categoryTitle.toLowerCase() === categoryTitle.toLowerCase();
  });

  const handleAddAnimal = (animal) => {
    dispatch(addAnimal(animal));
  };

  return (
    <div>
      <Header />
      <h1>Selected category of animals</h1>
      <ul className="categ-ui">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map(animal => (
            <li key={animal._uuid}>
              <h3>{animal.name || "No name available"}</h3>
              <p>Description: {animal.description || "No description available"}</p>
              <p>Category: {animal.categoryTitle || "No category available"}</p>
              <p>Price: {animal.price || "No price available"} ₾</p>
              <p>Stock: {animal.stock || "No stock available"}</p>
              <button onClick={() => handleAddAnimal(animal)}>
                Add to Wishlist
              </button>
            </li>
          ))
        ) : (
          <p>No animals available in this category.</p>
        )}
      </ul>
    </div>
  );
};

export default ShopApp;
