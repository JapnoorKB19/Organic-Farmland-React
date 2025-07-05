// src/components/common/MiniCart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const MiniCart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => navigate('/cart')}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        fontSize: '14px',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      🛒 Cart ({totalQuantity})
    </button>
  );
};

export default MiniCart;
