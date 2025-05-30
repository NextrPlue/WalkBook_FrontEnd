import React, { useState } from 'react';
import './BookFormPage.css';

export default function BookFormPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    isbn: '',
    category: '',
    description: '',
    additionalPrompts: ''
  });

  // 하드코딩된 AI 설정
  const AI_MODEL = "DALL-E 3";
  const API_KEY = process.env.DALLE_API_KEY
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = () => {
    // AI 이미지 생성 로직
    console.log('AI 이미지 생성 시작');
    console.log('모델:', AI_MODEL);
    console.log('프롬프트:', formData.additionalPrompts);
  };

  const handleSave = () => {
    // 저장 로직
    console.log('저장하기', formData);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="profile-icon"></div>
            <h1 className="app-title">도서 관리 시스템</h1>
          </div>
          <div className="header-right">
            <input
              type="text"
              placeholder="검색어 입력"
              className="search-input"
            />
            <input
              type="text"
              placeholder="카테고리 선택"
              className="category-input"
            />
            <button className="add-button">
              <span className="plus-icon">+</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-card">
          {/* Form Header */}
          <div className="form-header">
            <h2 className="form-title">제목 입력</h2>
          </div>

          <div className="form-body">
            <div className="form-layout">
              {/* Left: AI Generated Image */}
              <div className="image-section">
                <div className="image-header">
                  <h3 className="image-title">AI 생성 이미지</h3>
                  <span className="model-badge">모델: {AI_MODEL}</span>
                </div>
                
                <div className="image-container">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23000'/%3E%3Cg fill='%23fff' opacity='0.3'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='80' cy='70' r='2'/%3E%3Ccircle cx='120' cy='40' r='2.5'/%3E%3Ccircle cx='150' cy='80' r='2'/%3E%3Ccircle cx='200' cy='60' r='3'/%3E%3Ccircle cx='250' cy='90' r='2'/%3E%3Ccircle cx='300' cy='70' r='2.5'/%3E%3Ccircle cx='350' cy='50' r='2'/%3E%3Ccircle cx='70' cy='120' r='2'/%3E%3Ccircle cx='110' cy='140' r='3'/%3E%3Ccircle cx='160' cy='130' r='2'/%3E%3Ccircle cx='210' cy='150' r='2.5'/%3E%3Ccircle cx='270' cy='140' r='2'/%3E%3Ccircle cx='320' cy='120' r='3'/%3E%3Ccircle cx='40' cy='180' r='2.5'/%3E%3Ccircle cx='90' cy='200' r='2'/%3E%3Ccircle cx='140' cy='190' r='3'/%3E%3Ccircle cx='190' cy='210' r='2'/%3E%3Ccircle cx='240' cy='200' r='2.5'/%3E%3Ccircle cx='290' cy='180' r='2'/%3E%3Ccircle cx='340' cy='190' r='3'/%3E%3C/g%3E%3Crect x='120' y='150' width='160' height='200' fill='%23ff6b35' rx='10'/%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23000' font-size='24' font-weight='bold'%3E소%3C/text%3E%3Ctext x='200' y='230' text-anchor='middle' fill='%23000' font-size='24' font-weight='bold'%3E녀%3C/text%3E%3Ctext x='200' y='260' text-anchor='middle' fill='%23000' font-size='24' font-weight='bold'%3E이%3C/text%3E%3Ctext x='200' y='290' text-anchor='middle' fill='%23000' font-size='24' font-weight='bold'%3E 온%3C/text%3E%3Ctext x='200' y='320' text-anchor='middle' fill='%23000' font-size='24' font-weight='bold'%3E다%3C/text%3E%3Ctext x='140' y='180' text-anchor='middle' fill='%23000' font-size='10'%3E한강%3C/text%3E%3Ctext x='140' y='340' text-anchor='middle' fill='%23000' font-size='10'%3E창비%3C/text%3E%3C/svg%3E"
                    alt="AI 생성된 책 표지"
                    className="book-cover"
                  />
                </div>
              </div>

              {/* Right: Form Fields */}
              <div className="form-section">
                {/* Title Input - 맨 위에 위치 */}
                <div className="input-group">
                  <label className="input-label">제목</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                {/* Author and Publisher Row */}
                <div className="form-row">
                  <div className="input-group">
                    <label className="input-label">저자</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">출판사</label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Publish Date and ISBN Row */}
                <div className="form-row">
                  <div className="input-group">
                    <label className="input-label">출간일</label>
                    <input
                      type="text"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">ISBN</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="input-group">
                  <label className="input-label">카테고리</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                {/* Description */}
                <div className="input-group">
                  <label className="input-label">책 소개</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                {/* Additional Prompts */}
                <div className="input-group">
                  <label className="input-label">
                    추가 프롬프트 입력 (선택)
                    <span className="label-helper">AI 이미지 생성용</span>
                  </label>
                  <textarea
                    name="additionalPrompts"
                    value={formData.additionalPrompts}
                    onChange={handleInputChange}
                    placeholder="책 표지 이미지 생성을 위한 추가 설명을 입력하세요..."
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                {/* Save Button */}
                <div className="save-button-container">
                    <button onClick={handleImageUpload} className="generate-button">
                        📤 이미지 생성
                    </button>
                  <button onClick={handleSave} className="save-button">
                    저장 하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}