import React from 'react';
import './CategoryButton.css';

function CategoryButton({ label, active, onClick }) {
  return (
    <button
      className={`category-button ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{
        padding: '15px 20px',
        margin: '0 10px',
        backgroundColor: active ? '#f8d7da' : '#f2f2f2',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: active ? 'bold' : 'normal',
      }}
    >
      {label}
    </button>
  );
}

export default CategoryButton;
