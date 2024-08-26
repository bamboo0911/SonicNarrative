import React, { useState } from 'react';
import '.././App.css';  // 確保引入了App.css


const WritingPage = () => {
  const [text, setText] = useState(''); // 用於存儲用戶輸入的文字
  const [submittedText, setSubmittedText] = useState(null); // 用於存儲提交後的文字

  // 處理文本框輸入
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // 處理提交按鈕的點擊事件
  const handleSubmit = () => {
    setSubmittedText(text); // 將輸入的文字設置為已提交狀態
    setText(''); // 清空文本框
  };

  return (
    <div >
      <h1>Writing Page</h1>

      {/* 輸入框 */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here..."
        rows="10"
      />

      {/* 提交按鈕 */}
      <div>
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* 顯示提交的文本 */}
      {submittedText && (
        <div>
          <h2>Submitted Text:</h2>
          <p>
            {submittedText}
          </p>
        </div>
      )}

      {/* 返回主頁按鈕 */}
      <div>
        <a href="/">
          <button>
            Back to Main Page
          </button>
        </a>
      </div>
    </div>
  );
};



export default WritingPage;