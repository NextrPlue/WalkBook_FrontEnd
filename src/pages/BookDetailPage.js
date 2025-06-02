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
    // 실제로는 API에서 책 정보를 가져올 코드
    // 더미 데이터로 시뮬레이션
    const dummyBook = {
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
      },
      7: {
        id: 7,
        title: '부의 추월차선',
        author: 'M.J. 드마코',
        category: '경제',
        coverImage: null,
        description: '부자가 되는 진짜 방법에 대한 실용적 가이드입니다. 기존의 부자 되기 공식을 뒤엎는 혁신적인 부의 철학을 제시합니다.',
        publishDate: '2011-07-12',
        publisher: '토트',
        pages: 464,
        isbn: '978-89-962331-2-7'
      },
      8: {
        id: 8,
        title: '사피엔스',
        author: '유발 하라리',
        category: '역사',
        coverImage: null,
        description: '인류 문명의 발전사를 통찰력 있게 분석한 베스트셀러입니다. 호모 사피엔스가 어떻게 지구의 지배자가 되었는지를 흥미롭게 풀어냅니다.',
        publishDate: '2011-08-01',
        publisher: '김영사',
        pages: 636,
        isbn: '978-89-349-7019-0'
      },
      9: {
        id: 9,
        title: '아몬드',
        author: '손원평',
        category: '소설',
        coverImage: null,
        description: '감정을 잃은 소년의 성장을 그린 감동적인 소설입니다. 편견과 차별에 맞서는 따뜻한 인간애의 이야기를 담고 있습니다.',
        publishDate: '2017-03-31',
        publisher: '창비',
        pages: 267,
        isbn: '978-89-364-8712-4'
      },
      10: {
        id: 10,
        title: 'JavaScript: The Good Parts',
        author: '더글라스 크락포드',
        category: '기술',
        coverImage: null,
        description: 'JavaScript의 핵심 개념을 명확하게 설명한 프로그래밍 서적입니다. 복잡한 언어의 좋은 부분만을 골라 효과적으로 활용하는 방법을 제시합니다.',
        publishDate: '2008-05-01',
        publisher: '한빛미디어',
        pages: 175,
        isbn: '978-89-7914-449-7'
      },
      11: {
        id: 11,
        title: '돈의 속성',
        author: '김승호',
        category: '경제',
        coverImage: null,
        description: '돈에 대한 올바른 인식과 투자 철학을 제시하는 책입니다. 부자가 되기 위한 구체적이고 실용적인 방법론을 담고 있습니다.',
        publishDate: '2020-06-29',
        publisher: '스노우폭스북스',
        pages: 324,
        isbn: '978-89-09-74211-7'
      },
      12: {
        id: 12,
        title: '조선왕조실록',
        author: '박영규',
        category: '역사',
        coverImage: null,
        description: '조선 500년 역사를 생생하게 재현한 역사서입니다. 왕조의 흥망성쇠와 함께 당시 사람들의 삶을 흥미롭게 풀어냅니다.',
        publishDate: '2008-01-15',
        publisher: '웅진지식하우스',
        pages: 752,
        isbn: '978-89-01-08456-3'
      }
    };

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
        setBook(dummyBook[1]);
        setCategoryName('소설'); // 더미 데이터의 카테고리
      }
    };

    fetchBook();
  }, [id]);


  const handleEdit = async () => {
    try {
      // const updatedBook = {
      //   isbn: book.isbn,
      //   title: book.title, 
      //   author: book.author,
      //   publisher: book.publisher,
      //   publicationDate: book.publicationDate,
      //   description: book.description,
      //   coverUrl: book.coverUrl,
      //   category_id: book.categoryId
      // };

      // await axiosInstance.put(`/books/${id}`, updatedBook);

      //alert('도서 정보가 수정되었습니다!');
      // 수정 후 다시 상세조회 해도 되고 navigate 사용 가능
      navigate(`/book/edit/${id}`, {state : {book}});
    } catch (error) {
      console.error('도서 수정 실패:', error);
      alert('도서 수정에 실패했습니다.');
    }
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
              {/* <div className="info-row">
                <label>페이지:</label>
                <span>{book.pages}페이지</span>
              </div> */}
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
