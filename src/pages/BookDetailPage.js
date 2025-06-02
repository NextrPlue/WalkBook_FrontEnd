import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axiosInstance from '../api/axiosInstance';
import { fetchCategoryById } from '../api/bookService';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [imageError, setImageError] = useState(false);

  // 이미지 오류 처리 핸들러
  const handleImageError = () => {
    setImageError(true);
  };

  // 이미지 로드 성공 핸들러
  const handleImageLoad = () => {
    setImageError(false);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`/books/${id}`);
        const bookData = response.data.data;
        setBook(bookData);
        
        // 카테고리 이름 조회
        if (bookData.categoryId) {
          try {
            const categoryData = await fetchCategoryById(bookData.categoryId);
            setCategoryName(categoryData.categoryName);
          } catch (categoryError) {
            console.error('카테고리 조회 실패:', categoryError);
            setCategoryName('알 수 없음');
          }
        }
      } catch (error) {
        console.error('도서 상세 조회 실패:', error);
        alert('도서 정보를 불러올 수 없습니다.');
        navigate('/');
      }
    };

    fetchBook();
  }, [id, navigate]);


  const handleEdit = async () => {
    navigate(`/book/edit/${id}`, {state : {book}});
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 도서를 삭제하시겠습니까?')) {
      try {
        await axiosInstance.delete(`/books/${id}`);

        alert('도서가 삭제되었습니다.');
        navigate('/'); 
      } catch (error) {
        console.error('도서 삭제 실패:', error);
        alert('도서 삭제에 실패했습니다.');
      }
    }
  };

  if (!book) {
    return (
      <div>
        <Header 
          showCategoryDropdown={false} 
          showAddButton={true} 
          showBackButton={true}
        />
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <Header 
        showCategoryDropdown={false} 
        showAddButton={true} 
        showBackButton={true}
      />

      <main className="detail-content">
        <div className="book-detail">
          <div className="book-cover-section">
            {book.coverUrl && !imageError ? (
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="detail-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              <div className="detail-default-cover">
                <span>표지 이미지</span>
              </div>
            )}
          </div>

          <div className="book-info-section">
            <h1 className="detail-title">{book.title}</h1>
            
            <div className="detail-info">
              <div className="info-row">
                <label>저자:</label>
                <span>{book.author}</span>
              </div>
              <div className="info-row">
                <label>카테고리:</label>
                <span>{categoryName || book.category || '로딩 중...'}</span>
              </div>
              <div className="info-row">
                <label>출판사:</label>
                <span>{book.publisher}</span>
              </div>
              <div className="info-row">
                <label>출간일:</label>
                <span>{book.publicationTime}</span>
              </div>
              <div className="info-row">
                <label>ISBN:</label>
                <span>{book.isbn}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>책 소개</h3>
              <p className="description">{book.description}</p>
            </div>

            <div className="detail-actions">
              <button className="edit-button" onClick={handleEdit}>
                수정
              </button>
              <button className="delete-button" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;
