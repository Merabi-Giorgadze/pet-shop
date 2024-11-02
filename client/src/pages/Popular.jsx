import React, { useEffect, useState } from 'react';
import { getAnimals } from '../api/api';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { addAnimal } from '../redux/actions';

const Popular = () => {
  const [popularAnimals, setPopularAnimals] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPopularAnimals = async () => {
      try {
        const data = await getAnimals();
        const animals = data.items;
        const popularOnly = animals.filter(animal => animal.isPopular);
        setPopularAnimals(popularOnly);
      } catch (error) {
        console.error("Failed to fetch popular animals:", error);
      }
    };

    fetchPopularAnimals();
  }, []);

  const filteredAnimals = showInStock
    ? popularAnimals.filter(animal => animal.stock > 0)
    : popularAnimals;

  const handleAddAnimal = (animal) => {
    dispatch(addAnimal(animal));
  };

  return (
    <div>
      <Header />
      <h1>Popular Animals</h1>
      <label className="pop-leb">
        <input
          type="checkbox"
          checked={showInStock}
          onChange={() => setShowInStock(prev => !prev)}
        />
          Show Only In Stock
      </label>
      <ul className="pop">
        {filteredAnimals.map((animal) => (
          <li key={animal._uuid}>
            <h2>{animal.name}</h2>
            <p>Description: {animal.description}</p>
            <p>Category: {animal.categoryTitle}</p>
            <p>Price: {animal.price} ₾</p>
            <p>Stock: {animal.stock}</p>
            <p>Life Expectancy (year): {animal.lifeExpectancy}</p>
            <button onClick={() => handleAddAnimal(animal)}>Add to Wish List</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
