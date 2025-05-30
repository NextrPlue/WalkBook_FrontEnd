import React, { useState, useEffect } from 'react';
import './BookDetailPage.css';

const BookDetailPageSimple = ({ bookId, onNavigate }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const dummyBooks = {
      1: {
        id: 1,
        title: '1984',
        author: '조지 오웰',
        category: '소설',
        coverImage: null,
        description: '디스토피아 소설의 걸작으로, 전체주의 사회의 공포를 그린 작품입니다. 빅 브라더가 지배하는 세상에서 개인의 자유와 사랑이 어떻게 억압받는지를 보여줍니다.',
        publishDate: '1949-06-08',
        publisher: '민음사',
        pages: 408,
        isbn: '978-89-374-2647-6'
      },
      2: {
        id: 2,
        title: '나는 나로 살기로 했다',
        author: '김수현',
        category: '에세이',
        coverImage: null,
        description: '자기다움에 대한 깊이 있는 성찰을 담은 에세이입니다. 타인의 시선에 휘둘리지 않고 자신만의 길을 걸어가는 방법에 대해 이야기합니다.',
        publishDate: '2016-10-20',
        publisher: '마음의숲',
        pages: 272,
        isbn: '978-89-6301-234-5'
      },
      3: {
        id: 3,
        title: '원씽',
        author: '게리 켈러',
        category: '자기계발',
        coverImage: null,
        description: '성공을 위한 집중의 힘에 대해 다룬 자기계발서입니다. 한 번에 한 가지에 집중하는 것의 놀라운 효과를 과학적 근거와 함께 제시합니다.',
        publishDate: '2013-04-01',
        publisher: '비즈니스북스',
        pages: 280,
        isbn: '978-89-15-11950-7'
      },
      4: {
        id: 4,
        title: '해리포터와 마법사의 돌',
        author: 'J.K. 롤링',
        category: '소설',
        coverImage: null,
        description: '전 세계를 매료시킨 판타지 소설의 시작입니다. 마법사 해리포터의 모험을 통해 우정, 용기, 사랑의 가치를 전합니다.',
        publishDate: '1997-06-26',
        publisher: '문학수첩',
        pages: 359,
        isbn: '978-89-8292-103-4'
      },
      5: {
        id: 5,
        title: '클린 코드',
        author: '로버트 C. 마틴',
        category: '기술',
        coverImage: null,
        description: '좋은 코드를 작성하는 방법에 대한 개발자 필독서입니다. 읽기 쉽고 유지보수하기 좋은 코드의 원칙과 기법을 제시합니다.',
        publishDate: '2008-08-01',
        publisher: '인사이트',
        pages: 584,
        isbn: '978-89-6626-225-9'
      },
      6: {
        id: 6,
        title: '커피 한잔 마실까요?',
        author: '토도 미키',
        category: '에세이',
        coverImage: null,
        description: '일상의 소소한 행복을 찾는 여유로운 에세이입니다. 커피와 함께하는 평범한 순간들의 소중함을 일깨워줍니다.',
        publishDate: '2020-03-15',
        publisher: '알에이치코리아',
        pages: 216,
        isbn: '978-89-255-8734-2'
      }
    };

    const bookData = dummyBooks[bookId];
    if (bookData) {
      setBook(bookData);
    }
  }, [bookId]);

  const handleEdit = () => {
    onNavigate('form', bookId, true);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 도서를 삭제하시겠습니까?')) {
      alert('도서가 삭제되었습니다.');
      onNavigate('main');
    }
  };

  const handleBack = () => {
    onNavigate('main');
  };

  if (!book) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="book-detail-page">
      <header className="detail-header">
        <button className="back-button" onClick={handleBack}>
          ← 목록으로
        </button>
        <div className="action-buttons">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>
          <button className="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </header>

      <main className="detail-content">
        <div className="book-detail">
          <div className="book-cover-section">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="detail-cover" />
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
                <span>{book.category}</span>
              </div>
              <div className="info-row">
                <label>출판사:</label>
                <span>{book.publisher}</span>
              </div>
              <div className="info-row">
                <label>출간일:</label>
                <span>{book.publishDate}</span>
              </div>
              <div className="info-row">
                <label>페이지:</label>
                <span>{book.pages}페이지</span>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPageSimple;
