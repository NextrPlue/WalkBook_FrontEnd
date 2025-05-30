import React, { useState } from 'react';
import './CategoryDropdown.css';

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="category-dropdown">
      <button 
        className="dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        카테고리 선택
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {categories.map(category => (
            <button
              key={category}
              className={`dropdown-item ${category === selectedCategory ? 'selected' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
