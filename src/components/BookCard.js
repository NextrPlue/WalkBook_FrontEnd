import React, { useState } from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  const [imageError, setImageError] = useState(false);

  // 이미지 오류 처리 핸들러
  const handleImageError = () => {
    setImageError(true);
  };

  // 이미지 로드 성공 핸들러
  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        {book.coverUrl && !imageError ? (
          <img 
            src={book.coverUrl} 
            alt={book.title}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="default-cover">
            <span>표지 이미지</span>
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
