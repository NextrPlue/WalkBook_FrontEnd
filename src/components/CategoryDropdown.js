import React, { useState } from 'react';
import './CategoryDropdown.css';

const CategoryDropdown = ({ 
  categories, 
  selectedCategoryId, 
  onCategoryChange, 
  placeholder = '카테고리 선택',
  useFormStyle = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const selectedCategory = categories.find(cat => {
    const categoryId = cat.categoryId || cat.id;
    return categoryId && categoryId.toString() === selectedCategoryId?.toString();
  });

  if (useFormStyle) {
    return (
      <select
        value={selectedCategoryId || ''}
        onChange={(e) => {
          const selectedId = e.target.value;
          const category = categories.find(cat => {
            const categoryId = cat.categoryId || cat.id;
            return categoryId && categoryId.toString() === selectedId;
          });
          onCategoryChange(category);
        }}
        className="form-select"
      >
        <option value="">{placeholder}</option>
        {categories.map(category => {
          const categoryId = category.categoryId || category.id;
          return (
            <option key={categoryId} value={categoryId}>
              {category.categoryName}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div className="category-dropdown">
      <button 
        className="dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCategory ? selectedCategory.categoryName : placeholder}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {categories.map(category => {
            const categoryId = category.categoryId || category.id;
            const isSelected = selectedCategoryId && categoryId.toString() === selectedCategoryId.toString();
            return (
              <button
                key={categoryId}
                className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
