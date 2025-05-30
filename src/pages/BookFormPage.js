import React, { useState } from 'react';
import './BookFormPage.css';
import Header from '../components/Header';

export default function BookFormPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    isbn: '',
    category: '',
    description: '',
    additionalPrompts: '',
    apikey: '',
  });

  // 하드코딩된 AI 설정
  const AI_MODEL = "DALL-E 3";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = async () => {
    if (!formData.title && !formData.apikey) {
      alert('책 제목이나 API-KEY를 입력해주세요.');
      return;
    }
  
    setIsGenerating(true);
    
    try {
      // 프롬프트 생성
      let prompt = '';
      if (formData.title) {
        prompt += `Create a professional book cover design for "${formData.title}"`;
        if (formData.author) {
          prompt += ` by ${formData.author}`;
        }
      }
      
      if (formData.additionalPrompts) {
        prompt += `. ${formData.additionalPrompts}`;
      }
      
      prompt += '. The design should be clean, professional, and suitable for a book cover with clear typography and attractive visual elements.';
  
      console.log('생성할 프롬프트:', prompt);
  
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formData.apikey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
          response_format: 'url'
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '이미지 생성에 실패했습니다.');
      }
  
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        setGeneratedImage(data.data[0].url);
        console.log('이미지 생성 완료:', data.data[0].url);
      } else {
        throw new Error('생성된 이미지가 없습니다.');
      }
      
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert(`이미지 생성 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // 저장 로직
    console.log('저장하기', formData);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        showCategoryDropdown={false} 
        showAddButton={true} 
        showBackButton={true}
      />

      {/* Main Content */}
      <main className="main-content-form">
        <div className="content-card">
          {/* Form Header */}
          <div className="form-header">
            <h2 className="form-title">추가 하기</h2>
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
                    src={generatedImage || "기본_SVG_이미지"}
                    alt={generatedImage ? "AI 생성된 책 표지" : "기본 책 표지 플레이스홀더"}
                    className="book-cover"
                  />
                  {isGenerating && (
                    <div className="loading-overlay">
                      <div className="loading-spinner"></div>
                      <p>이미지 생성 중...</p>
                    </div>
                  )}
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

                {/* API KEY */}
                <div className="input-group">
                  <label className="input-label">API KEY</label>
                  <input
                    type="text"
                    name="apikey"
                    value={formData.apikey}
                    onChange={handleInputChange}
                    className="form-input"
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