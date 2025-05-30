import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import './MainPage.css';
import { fetchBooks } from '../api/bookService';


const MainPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 더미 데이터 (실제로는 API에서 가져올 데이터)
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
    },
    {
      id: 7,
      title: '부의 추월차선',
      author: 'M.J. 드마코',
      category: '경제',
      coverImage: null,
      description: '부자가 되는 진짜 방법에 대한 실용적 가이드입니다.',
      publishDate: '2024-01-07'
    },
    {
      id: 8,
      title: '사피엔스',
      author: '유발 하라리',
      category: '역사',
      coverImage: null,
      description: '인류 문명의 발전사를 통찰력 있게 분석한 베스트셀러입니다.',
      publishDate: '2024-01-08'
    },
    {
      id: 9,
      title: '아몬드',
      author: '손원평',
      category: '소설',
      coverImage: null,
      description: '감정을 잃은 소년의 성장을 그린 감동적인 소설입니다.',
      publishDate: '2024-01-09'
    },
    {
      id: 10,
      title: 'JavaScript: The Good Parts',
      author: '더글라스 크락포드',
      category: '기술',
      coverImage: null,
      description: 'JavaScript의 핵심 개념을 명확하게 설명한 프로그래밍 서적입니다.',
      publishDate: '2024-01-10'
    },
    {
      id: 11,
      title: '돈의 속성',
      author: '김승호',
      category: '경제',
      coverImage: null,
      description: '돈에 대한 올바른 인식과 투자 철학을 제시하는 책입니다.',
      publishDate: '2024-01-11'
    },
    {
      id: 12,
      title: '조선왕조실록',
      author: '박영규',
      category: '역사',
      coverImage: null,
      description: '조선 500년 역사를 생생하게 재현한 역사서입니다.',
      publishDate: '2024-01-12'
    }
  ];

  const [categories, setCategories] = useState(['전체']);

  useEffect(() => {
  // API에서 도서 데이터를 가져옴
    const fetchData = async () => {
      try {
        const booksFromAPI = await fetchBooks();
        const formattedBooks = booksFromAPI.map(book => ({
          bookId: book.bookId,
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          publishDate: book.publicationDate,
          description: book.description,
          coverUrl: book.coverUrl,
          categoryId: book.categoryId,
          // category: categoryIdToName[book.categoryId],
          createdAt: book.createdAt,
          updatedAt: book.updatedAt
          
        }));
        setBooks(formattedBooks);
      } catch (err) {
        console.error('도서 데이터 로딩 실패:', err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // 카테고리와 검색어에 따른 필터링
    let filtered = books;

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // 검색어 필터링
    if (searchTerm.trim()) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm, books]);

  // 카테고리 API 호출
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories'); //API 수정
        const result = await response.json();

        if (response.ok && result.status === 200) {
          const apiCategories = result.data.categories.map(cat => cat.categoryName);
          setCategories(['전체', ...apiCategories]);
        } else {
          console.error('카테고리 조회 실패:', result.message);
        }
      } catch (error) {
        console.error('카테고리 API 호출 오류:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
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
      <Header
        showCategoryDropdown={true}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showAddButton={true}
      />

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

export default MainPage;
