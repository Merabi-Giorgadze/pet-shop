import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import { addToWishlist, removeAnimal } from '../redux/actions';

const Wishlist = () => {
  const dispatch = useDispatch();
  const [checkedAnimals, setCheckedAnimals] = useState([]);
  const selectedAnimals = useSelector(state => state.animal.selectedAnimals);

  useEffect(() => {
    setCheckedAnimals(Array(selectedAnimals.length).fill(false));
  }, [selectedAnimals]);

  const handleToggleAll = () => {
    const allChecked = checkedAnimals.every(Boolean);
    setCheckedAnimals(checkedAnimals.map(() => !allChecked));
  };

  const handleToggleIndividual = (index) => {
    const newChecked = [...checkedAnimals];
    newChecked[index] = !newChecked[index];
    setCheckedAnimals(newChecked);
  };

  const handleSubmit = () => {
    const selectedToAdd = selectedAnimals.filter((_, index) => checkedAnimals[index]);
    const validAnimals = [];
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    selectedToAdd.forEach(animal => {
    if (animal.stock > 0) {
      if (!currentWishlist.some(item => item._uuid === animal._uuid)) {
        validAnimals.push(animal);
      } else {
        alert(`${animal.name} - Already in Card`);
      }
    } else {
      alert(`${animal.name} - Out of stock`);
    }
  });

    if (validAnimals.length > 0) {
      const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const updatedWishlist = [...currentWishlist, ...validAnimals];

      validAnimals.forEach(animal => {
        dispatch(addToWishlist(animal));
        handleRemoveAnimal(animal._uuid);
      });

      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }

    setCheckedAnimals(Array(selectedAnimals.length).fill(false));
  };

  const handleRemoveAnimal = (animalId) => {
    dispatch(removeAnimal(animalId));
  };

  return (
    <div>
      <Header />
      <h1>Selected Animals</h1>
      <h2 className="wishlist-h">
        <input 
          type="checkbox" 
          checked={checkedAnimals.every(Boolean)} 
          onChange={handleToggleAll} 
        /> Select All
      </h2>
      <button className="wishlist-but" onClick={handleSubmit}>Submit Selected Animals</button>
      <ul className="wishlist">
        {selectedAnimals.length > 0 ? (
          selectedAnimals.map((animal, index) => (
            <li key={animal._uuid}> 
              <div>
                <input 
                  type="checkbox" 
                  checked={checkedAnimals[index] || false}
                  onChange={() => handleToggleIndividual(index)} 
                />
                Name: {animal.name}
                <button onClick={() => handleRemoveAnimal(animal._uuid)}>Delete</button>
              </div>
              <div>Description: {animal.description}</div>
              <div>Popular: {animal.isPopular ? 'Popular' : 'Not Popular'}</div>
              <div>Price: {animal.price && !isNaN(animal.price) ? 
                  Number(animal.price).toFixed(2) : 'N/A'
                } ₾
              </div>
              <div>Stock: {typeof animal.stock === 'number' ? animal.stock : 'N/A'}
              </div>
            </li>
          ))
        ) : (
          <p className="wishlist-p">No animals selected</p>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;
