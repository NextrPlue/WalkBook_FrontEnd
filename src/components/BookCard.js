import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} />
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
