import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const organizations = [
  { id: 1, name: "Red Cross" },
  { id: 2, name: "UNICEF" },
  { id: 3, name: "Doctors Without Borders" },
  { id: 4, name: "World Wildlife Fund" },
];

const Donate = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (orgId) => {
    setSelectedOrg(orgId === selectedOrg ? null : orgId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOrg && amount) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div>
      <Header />
      <h1>Donate</h1>
      <form className="Donate" onSubmit={handleSubmit}>
        <div>
          <h3>Select Organization</h3>
          {organizations.map((org) => (
            <label key={org.id}>
              <input
                type="checkbox"
                checked={selectedOrg === org.id}
                onChange={() => handleCheckboxChange(org.id)}
              />
              {org.name}
            </label>
          ))}
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            /> ₾
          </label>
        </div>
        <button type="submit">Donate</button>
      </form>

      {showModal && (
        <div style={modalStyle}>
          <h3>Thank You!</h3>
          <p>
            You have donated <strong>${amount}</strong> to {organizations.find(org => org.id === selectedOrg)?.name}.
          </p>
          <p>Your generosity is greatly appreciated!</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
};

export default Donate;
