
jest.mock('axios'); 

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from '../pages/MainPage';
import { BrowserRouter } from 'react-router-dom';
import * as bookService from '../api/bookService';

// 🔧 useNavigate 모킹
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// API 모킹
jest.mock('../api/bookService');

describe('MainPage 네비게이션 테스트', () => {
  const mockBooks = [
    {
      id: 1,
      isbn: '123456',
      title: '테스트 책',
      author: '홍길동',
      publisher: '출판사',
      publicationTime: '2023-01-01',
      description: '설명',
      coverUrl: '',
      categoryId: 1,
      createdAt: '',
      updatedAt: ''
    }
  ];

  const mockCategories = [
    { categoryId: 1, categoryName: '소설' }
  ];

  beforeEach(() => {
    bookService.fetchBooks.mockResolvedValue(mockBooks);
    bookService.fetchCategories.mockResolvedValue(mockCategories);
  });

  const renderPage = () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
  };

  test('플러스 버튼 클릭 시 "/book/new"로 이동', async () => {
    renderPage();

    // 플러스 버튼은 "+" 텍스트를 가짐
    const addButton = await screen.findByText('+');
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith('/book/new');
  });

  test('BookCard 클릭 시 상세 페이지 "/book/1"로 이동', async () => {
    renderPage();

    const bookTitle = await screen.findByText('테스트 책');
    fireEvent.click(bookTitle); // 제목을 클릭하면 onClick이 트리거됨

    expect(mockNavigate).toHaveBeenCalledWith('/book/1');
  });
});