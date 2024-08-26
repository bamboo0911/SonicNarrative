import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate(); // 使用 useNavigate 來處理頁面導航

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("Please allow location access to use this feature.");
          } else {
            console.error("Error fetching geolocation: ", error);
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // 處理 "Submit to AI" 按鈕點擊事件
  const handleSubmitToAI = () => {
    // 將用戶資料提交到後端（這裡您可以加入相應的提交邏輯）
    navigate('/ai-result'); // 跳轉到新的頁面以顯示 AI 生成的內容
  };

  return (
    <div>
      <h1>Main Page</h1>
      <p>Your current location is:</p>
      <p>Latitude: {location.latitude ? location.latitude : "Fetching..."}</p>
      <p>Longitude: {location.longitude ? location.longitude : "Fetching..."}</p>
  
      <div style={{ marginTop: '20px' }}>
        <Link to="/recording">
          <button>Start Recording</button>
        </Link>
      </div>
  
      <div style={{ marginTop: '20px' }}>
        <Link to="/photo">
          <button>Take Photo</button>
        </Link>
      </div>
  
      <div style={{ marginTop: '20px' }}>
        <Link to="/writing">
          <button>Start Writing</button>
        </Link>
      </div>

      {/* 新增 "Submit to AI" 按鈕 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmitToAI}>Submit to AI</button>
      </div>
    </div>
  );
};

export default MainPage;
