import React, { useState, useEffect } from 'react';
import './BookFormPage.css';

const BookFormPageSimple = ({ bookId, isEditMode, onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publisher: '',
    publishDate: '',
    pages: '',
    isbn: '',
    description: '',
    coverImage: null
  });

  const [errors, setErrors] = useState({});

  const categories = ['소설', '에세이', '자기계발', '기술', '경제', '역사'];

  useEffect(() => {
    if (isEditMode && bookId) {
      const dummyBook = {
        title: `도서 이름 ${bookId}`,
        author: '저자',
        category: '소설',
        publisher: '출판사명',
        publishDate: '2024-01-01',
        pages: '300',
        isbn: '978-89-1234-567-8',
        description: '이 책은 매우 흥미로운 내용을 담고 있습니다.',
        coverImage: null
      };
      setFormData(dummyBook);
    }
  }, [bookId, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '도서명을 입력해주세요.';
    }
    if (!formData.author.trim()) {
      newErrors.author = '저자를 입력해주세요.';
    }
    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요.';
    }
    if (!formData.publisher.trim()) {
      newErrors.publisher = '출판사를 입력해주세요.';
    }
    if (!formData.publishDate) {
      newErrors.publishDate = '출간일을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditMode) {
      alert('도서가 수정되었습니다.');
    } else {
      alert('도서가 등록되었습니다.');
    }
    
    onNavigate('main');
  };

  const handleCancel = () => {
    if (isEditMode) {
      onNavigate('detail', bookId);
    } else {
      onNavigate('main');
    }
  };

  return (
    <div className="book-form-page">
      <header className="form-header">
        <h1>{isEditMode ? '도서 수정' : '도서 등록'}</h1>
      </header>

      <main className="form-content">
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">도서명 *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="author">저자 *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={errors.author ? 'error' : ''}
              />
              {errors.author && <span className="error-message">{errors.author}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">카테고리 *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">카테고리 선택</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="publisher">출판사 *</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                className={errors.publisher ? 'error' : ''}
              />
              {errors.publisher && <span className="error-message">{errors.publisher}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishDate">출간일 *</label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className={errors.publishDate ? 'error' : ''}
              />
              {errors.publishDate && <span className="error-message">{errors.publishDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pages">페이지 수</label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">표지 이미지</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">책 소개</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              취소
            </button>
            <button type="submit" className="submit-button">
              {isEditMode ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BookFormPageSimple;
