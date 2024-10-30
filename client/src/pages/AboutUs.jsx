import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Header from './Header';

const AboutUs = () => {
  return (
    <div>
      <Header />
      <h1>About Us</h1>
      <div className="about-us">
        <p><strong>Address:</strong> <a   href="https://www.google.com/maps/  search/?api=1&query=41.988006,44. 113306" target="_blank"  rel="noopener noreferrer">33   Stalin Ave, Gori</a></p>
        <p><strong>Phone:</strong> <a   href="tel:+995531234567"> +995531234567</a></p>
        <h2>Our Standards</h2>
        <p>Our pet store adheres to the   highest standards in animal care  and welfare. 
        We prioritize the health and    well-being of our animals,  ensuring  they are 
        kept in clean, spacious     environments. Our staff is  trained  in proper animal 
        handling techniques and is  always   ready to provide  information on care  and 
        maintenance for all our pets. We    also ensure that our animals  receive   regular 
        veterinary check-ups and    vaccinations, so you can adopt  with  confidence.</p>
        <h2>Follow Us</h2>
        <div style={{ display: 'flex',  gap: '10px' }}>
          <a href="https://www.facebook.  com" target="_blank"  rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://www.instagram. com" target="_blank"   rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.twitter. com" target="_blank"   rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
