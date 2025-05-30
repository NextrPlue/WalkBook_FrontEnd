import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCardSimple';
import CategoryDropdown from '../components/CategoryDropdownSimple';
import SearchBar from '../components/SearchBarSimple';
import './MainPage.css';

const MainPageSimple = ({ onNavigate }) => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 더미 데이터
  const dummyBooks = [
    {
      id: 1,
      title: '1984',
      author: '조지 오웰',
      category: '소설',
      coverImage: null,
      description: '디스토피아 소설의 걸작으로, 전체주의 사회의 공포를 그린 작품입니다.',
      publishDate: '2024-01-01'
    },
    {
      id: 2,
      title: '나는 나로 살기로 했다',
      author: '김수현',
      category: '에세이',
      coverImage: null,
      description: '자기다움에 대한 깊이 있는 성찰을 담은 에세이입니다.',
      publishDate: '2024-01-02'
    },
    {
      id: 3,
      title: '원씽',
      author: '게리 켈러',
      category: '자기계발',
      coverImage: null,
      description: '성공을 위한 집중의 힘에 대해 다룬 자기계발서입니다.',
      publishDate: '2024-01-03'
    },
    {
      id: 4,
      title: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      category: '소설',
      coverImage: null,
      description: '전 세계를 매료시킨 판타지 소설의 시작입니다.',
      publishDate: '2024-01-04'
    },
    {
      id: 5,
      title: '클린 코드',
      author: '로버트 C. 마틴',
      category: '기술',
      coverImage: null,
      description: '좋은 코드를 작성하는 방법에 대한 개발자 필독서입니다.',
      publishDate: '2024-01-05'
    },
    {
      id: 6,
      title: '커피 한잔 마실까요?',
      author: '토도 미키',
      category: '에세이',
      coverImage: null,
      description: '일상의 소소한 행복을 찾는 여유로운 에세이입니다.',
      publishDate: '2024-01-06'
    }
  ];

  const categories = ['전체', '소설', '에세이', '자기계발', '기술', '경제', '역사'];

  useEffect(() => {
    setBooks(dummyBooks);
  }, []);

  useEffect(() => {
    let filtered = books;

    if (selectedCategory !== '전체') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm, books]);

  const handleAddBook = () => {
    onNavigate('form', null, false);
  };

  const handleBookClick = (bookId) => {
    onNavigate('detail', bookId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getResultMessage = () => {
    if (searchTerm.trim() && selectedCategory !== '전체') {
      return `"${selectedCategory}" 카테고리에서 "${searchTerm}" 검색 결과: ${filteredBooks.length}건`;
    } else if (searchTerm.trim()) {
      return `"${searchTerm}" 검색 결과: ${filteredBooks.length}건`;
    } else if (selectedCategory !== '전체') {
      return `${selectedCategory} 카테고리: ${filteredBooks.length}건`;
    }
    return `전체 도서: ${filteredBooks.length}건`;
  };

  return (
    <div className="main-page">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="book-icon">📖</span>
            도서 관리 시스템
          </h1>
          <div className="header-actions">
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <button className="add-button" onClick={handleAddBook}>
              +
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h2 className="section-title">도서 목록</h2>
        
        <SearchBar onSearch={handleSearch} />
        
        <div className="results-info">
          <p className="results-count">{getResultMessage()}</p>
        </div>
        
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="empty-state">
            {searchTerm.trim() || selectedCategory !== '전체' ? (
              <div>
                <p>검색 조건에 맞는 도서가 없습니다.</p>
                <button 
                  className="reset-filters-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('전체');
                  }}
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <p>등록된 도서가 없습니다.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPageSimple;
