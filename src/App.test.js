import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// 모든 페이지 컴포넌트들을 모킹
jest.mock('./pages/MainPage', () => {
  return function MainPage() {
    return <div data-testid="main-page">Main Page</div>;
  };
});

jest.mock('./pages/BookDetailPage', () => {
  return function BookDetailPage() {
    return <div data-testid="book-detail-page">Book Detail Page</div>;
  };
});

jest.mock('./pages/BookFormPage', () => {
  return function BookFormPage() {
    return <div data-testid="book-form-page">Book Form Page</div>;
  };
});

jest.mock('./pages/NotFoundPage', () => {
  return function NotFoundPage() {
    return <div data-testid="not-found-page">Not Found Page</div>;
  };
});

describe('App', () => {
  test('App 컴포넌트가 에러 없이 렌더링된다', () => {
    render(<App />);
    
    // App 컴포넌트가 렌더링되었는지 확인
    expect(document.querySelector('.App')).toBeTruthy();
  });

  test('기본 경로(/)에서 MainPage가 렌더링된다', () => {
    // 기본 경로는 "/" 이므로 MainPage가 렌더링될 것
    const { getByTestId } = render(<App />);
    
    expect(getByTestId('main-page')).toBeTruthy();
  });
});