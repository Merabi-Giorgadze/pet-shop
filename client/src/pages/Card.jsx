import React, { useEffect, useState } from 'react';
import Header from './Header';
import { fetchExchangeRate } from '../api/exchangeApi';

const API_KEY = "1vpxH5UWS87ro5SwSQVGbdaUayeNNYpWdxtqP28QkyGCEONE2A";
const API_URL_ANIMALS = "https://crudapi.co.uk/api/v1/animal";

const Card = () => {
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modalData, setModalData] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDollar, setIsDollar] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(2.6);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
    
    const initialQuantities = {};
    storedWishlist.forEach(animal => {
      initialQuantities[animal._uuid] = 1;
    });
    setQuantities(initialQuantities);
    fetchExchangeRate().then(rate => setExchangeRate(rate));
  }, []);

  const handleIncrease = (animalId) => {
    setQuantities(prev => ({
      ...prev,
      [animalId]: Math.min(prev[animalId] + 1, wishlist.find(animal => animal._uuid === animalId).stock)
    }));
  };

  const handleDecrease = (animalId) => {
    setQuantities(prev => ({
      ...prev,
      [animalId]: Math.max(prev[animalId] - 1, 1)
    }));
  };

  const handleRemove = (animalId) => {
    const updatedWishlist = wishlist.filter(animal => animal._uuid !== animalId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handlePurchase = async (animal) => {
    const quantity = quantities[animal._uuid] || 1;
    const updatedStock = animal.stock - quantity;

    try {
      console.log(`Purchasing ${quantity} of ${animal.name}`);
      const response = await fetch(`${API_URL_ANIMALS}/${animal._uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ stock: updatedStock }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const updatedResponse = await fetch(`${API_URL_ANIMALS}/${animal._uuid}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (!updatedResponse.ok) {
        throw new Error(`Failed to fetch updated animal data: ${updatedResponse.statusText}`);
      }

      const updatedAnimal = await updatedResponse.json();

      setWishlist(prevWishlist =>
        prevWishlist.map(animalItem =>
          animalItem._uuid === updatedAnimal._uuid ? updatedAnimal : animalItem
        )
      );

      const totalPrice = isDollar
        ? (animal.price * quantity / exchangeRate).toFixed(2)
        : (animal.price * quantity).toFixed(2);


      setModalData({ name: animal.name, quantity, totalPrice });
      setModalOpen(true);

      handleRemove(animal._uuid);
    } catch (error) {
      console.error('Error updating stock:', error.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <div>
      <Header />
      <h1>Card</h1>
      <button className="card-but" onClick={() => setIsDollar(!isDollar)}>
        {isDollar ? 'Convert to ₾' : 'Convert to $'}
      </button>
      <ul className="card">
        {wishlist.length > 0 ? (
          wishlist.map(animal => {
            const quantity = quantities[animal._uuid] || 1;
            const totalPrice = (animal.price && !isNaN(animal.price)) 
              ? (isDollar ? (Number(animal.price) * quantity / exchangeRate).toFixed(2) : (Number(animal.price) * quantity).toFixed(2)) 
              : 'N/A';

            return (
              <li key={animal._uuid}  >
                <div>
                  <strong>Name:</strong> {animal.name}
                </div>
                <div>
                  <strong>Description:</strong> {animal.description}
                </div>
                <div>
                  <strong>Popularity:</strong> {animal.isPopular ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Price:</strong> {animal.price && !isNaN(animal.price) ? (isDollar ? (Number(animal.price) / exchangeRate).toFixed(2) : Number(animal.price).toFixed(2)) : 'N/A'} {isDollar ? '$' : '₾'}
                </div>
                <div>
                  <strong>Stock:</strong> {typeof animal.stock === 'number' ? animal.stock : 'N/A'}
                </div>
                <div>
                  <strong>Quantity:</strong>
                  <button onClick={() => handleDecrease(animal._uuid)}>-</button>
                  <p>{quantity} </p>
                  <button onClick={() => handleIncrease(animal._uuid)}>+</button>
                </div>
                <button onClick={() => handleRemove(animal._uuid)}>Delete</button>
                <div>
                  <strong>Price Total:</strong> {totalPrice} {isDollar ? '$' : '₾'}
                </div>
                <button onClick={() => handlePurchase(animal)}>Buy now</button>
              </li>
            );
          })
        ) : (
          <p  className="card-p">Card is empty</p>
        )}
      </ul>

      {isModalOpen && modalData && (
        <div className="modal">
          <div className="modal-content">
            <h2>Purchase Confirmation</h2>
            <p><strong>Name:</strong> {modalData.name}</p>
            <p><strong>Quantity:</strong> {modalData.quantity}</p>
            <p>
              <strong>Total Price:</strong> {modalData.totalPrice} {isDollar ? '$' : '₾'}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
