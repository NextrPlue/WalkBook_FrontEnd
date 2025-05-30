import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown';
import './Header.css';

const Header = ({ 
  showCategoryDropdown = false, 
  categories = [], 
  selectedCategory = '전체', 
  onCategoryChange = null,
  showAddButton = true,
  showBackButton = false,
  backButtonText = '← 목록으로'
}) => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    // TODO: 팀원이 도서 등록 페이지 완성 후 주석 해제
    // navigate('/book/new');
    
    // 임시 처리: 페이지가 준비되지 않았다는 알림
    alert('도서 등록 페이지는 현재 개발 중입니다.\n팀원이 완성 후 이용 가능합니다.');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {showBackButton && (
            <button className="header-back-button" onClick={handleBack}>
              {backButtonText}
            </button>
          )}
          <h1 className="header-title" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            <span className="book-icon">📖</span>
            도서 관리 시스템
          </h1>
        </div>
        <div className="header-actions">
          {showCategoryDropdown && (
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
          )}
          {showAddButton && (
            <button className="add-button" onClick={handleAddBook}>
              +
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
