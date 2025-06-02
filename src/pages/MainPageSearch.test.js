// 반드시 import 이전에 선언
jest.mock('../api/bookService', () => ({
  fetchBooks: jest.fn(),
  fetchCategories: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { fetchBooks, fetchCategories } from '../api/bookService';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MainPage 검색 및 필터 테스트', () => {
  beforeEach(() => {
    // 모킹 데이터 설정
    fetchBooks.mockResolvedValue([
      {
        id: 1,
        isbn: '123456789',
        title: 'AI 시대의 글쓰기',
        author: '김지능',
        publisher: '미래출판사',
        publicationDate: '2025-01-01',
        description: '인공지능을 활용한 글쓰기 전략',
        coverUrl: 'https://example.com/covers/ai.jpg',
        createdAt: '2025-05-01T10:00:00Z',
        updatedAt: '2025-05-10T14:30:00Z',
        categoryId: 2,
      },
      {
        id: 2,
        isbn: '987654321',
        title: '파이썬 기초',
        author: '이파이',
        publisher: '코딩출판사',
        publicationDate: '2024-11-20',
        description: '초보자를 위한 파이썬 입문서',
        coverUrl: 'https://example.com/covers/python.jpg',
        createdAt: '2024-12-01T09:00:00Z',
        updatedAt: '2025-01-02T11:30:00Z',
        categoryId: 1,
      },
    ]);

    fetchCategories.mockResolvedValue([
      { categoryId: 1, categoryName: '소설' },
      { categoryId: 2, categoryName: 'IT 전문 서적' },
    ]);
  });

  test('도서 검색 기능 테스트', async () => {
    renderWithRouter(<MainPage />);
    const searchInput = await screen.findByPlaceholderText(/도서명 또는 저자명/i);

    fireEvent.change(searchInput, { target: { value: 'AI' } });

    await waitFor(() => {
      expect(screen.getByText(/AI 시대의 글쓰기/i)).toBeInTheDocument();
      expect(screen.queryByText(/파이썬 기초/i)).not.toBeInTheDocument();
    });
  });

  test('카테고리 필터 테스트: "소설" 선택 시 해당 도서만 표시', async () => {
    renderWithRouter(<MainPage />);

    const dropdownButton = await screen.findByRole('button', {
      name: /카테고리 선택/i,
    });
    fireEvent.click(dropdownButton);

    const categoryItem = await screen.findByText('소설');
    fireEvent.click(categoryItem);

    await waitFor(() => {
      expect(screen.getByText(/파이썬 기초/i)).toBeInTheDocument();
      expect(screen.queryByText(/AI 시대의 글쓰기/i)).not.toBeInTheDocument();
    });
  });
});
