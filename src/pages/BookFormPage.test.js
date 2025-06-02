import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookFormPage from './BookFormPage';

// API 서비스 모킹
jest.mock('../api/bookService', () => ({
  fetchCategories: jest.fn(() => Promise.resolve([
    { id: 1, categoryName: '소설' },
    { id: 2, categoryName: '에세이' }
  ])),
  fetchCategoryById: jest.fn(() => Promise.resolve({ categoryName: '소설' }))
}));

// axiosInstance 모킹
jest.mock('../api/axiosInstance', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Header 컴포넌트 모킹
jest.mock('../components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

// CategoryDropdown 컴포넌트 모킹
jest.mock('../components/CategoryDropdown', () => {
  return function MockCategoryDropdown({ onCategoryChange, placeholder }) {
    return (
      <select data-testid="category-dropdown" onChange={(e) => {
        onCategoryChange({ id: e.target.value, categoryName: '테스트 카테고리' });
      }}>
        <option value="">{placeholder}</option>
        <option value="1">소설</option>
        <option value="2">에세이</option>
      </select>
    );
  };
});

// useNavigate와 useLocation 모킹
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }) // 새 책 등록 모드
}));

const renderBookFormPage = () => {
  return render(
    <MemoryRouter>
      <BookFormPage />
    </MemoryRouter>
  );
};

describe('BookFormPage 입력 폼 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('페이지 제목이 올바르게 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      expect(screen.getByText('도서 추가')).toBeInTheDocument();
    });
  });

  test('제목 입력 필드가 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      const titleInput = screen.getByLabelText('제목');
      expect(titleInput).toBeInTheDocument();
      expect(titleInput).toHaveAttribute('name', 'title');
    });
  });

  test('카테고리 드롭다운이 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      const categoryDropdown = screen.getByTestId('category-dropdown');
      expect(categoryDropdown).toBeInTheDocument();
    });
  });

  test('책 소개 텍스트 영역이 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      const descriptionTextarea = screen.getByLabelText('책 소개');
      expect(descriptionTextarea).toBeInTheDocument();
      expect(descriptionTextarea).toHaveAttribute('name', 'description');
    });
  });

  test('추가 프롬프트 텍스트 영역이 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      const additionalPromptsTextarea = screen.getByLabelText(/추가 프롬프트 입력/);
      expect(additionalPromptsTextarea).toBeInTheDocument();
      expect(additionalPromptsTextarea).toHaveAttribute('name', 'additionalPrompts');
    });
  });

  test('이미지 생성 버튼이 렌더링된다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      const generateButton = screen.getByText('📤 이미지 생성');
      expect(generateButton).toBeInTheDocument();
    });
  });

  test('모든 주요 폼 요소들이 존재한다', async () => {
    renderBookFormPage();
    
    await waitFor(() => {
      // 필수 입력 필드들이 모두 렌더링되었는지 확인
      expect(screen.getByLabelText('제목')).toBeInTheDocument();
      expect(screen.getByLabelText('저자')).toBeInTheDocument();
      expect(screen.getByLabelText('출판사')).toBeInTheDocument();
      expect(screen.getByLabelText('ISBN')).toBeInTheDocument();
      expect(screen.getByTestId('category-dropdown')).toBeInTheDocument();
      expect(screen.getByText('저장하기')).toBeInTheDocument();
    });
  });

});