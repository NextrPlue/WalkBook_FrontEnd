import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  title = '오류가 발생했습니다', 
  message = '잠시 후 다시 시도해주세요.',
  onRetry = null 
}) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">{title}</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
