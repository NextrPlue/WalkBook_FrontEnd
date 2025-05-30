import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BookDetailPage from './pages/BookDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import BookFormPage from './pages/BookFormPage';

// import BookFormPage from './pages/BookFormPage'; // 나중에 팀원이 추가할 때 주석 해제
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          {/* 나중에 팀원이 추가할 라우트들 */}
          <Route path="/book/new" element={<BookFormPage />} />
          {/* <Route path="/book/edit/:id" element={<BookFormPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
