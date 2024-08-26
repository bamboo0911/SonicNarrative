import React, { useState } from 'react';
import '.././App.css';  // 確保引入了App.css


const PhotoPage = () => {
  const [photo, setPhoto] = useState(null); // 用來存儲已上傳或拍攝的照片

  // 當用戶選擇照片或拍攝照片時觸發
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]; // 獲取選中的文件（照片）
    if (file) {
      const reader = new FileReader(); // 創建FileReader對象來讀取文件
      reader.onloadend = () => {
        setPhoto(reader.result); // 將讀取的照片（Base64 URL）設置為photo狀態
      };
      reader.readAsDataURL(file); // 讀取文件內容並轉換為Data URL
    }
  };

  // 當用戶點擊"Choose Another Photo"時觸發
  const handleChooseAnotherPhoto = () => {
    setPhoto(null); // 清空photo狀態，允許重新選擇照片
  };

  return (
    <div>
      <h1>Photo Page</h1>

      {/* 如果沒有選擇照片，顯示上傳按鈕 */}
      {!photo && (
        <div>
          <label htmlFor="upload-button" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
            Upload Photo
          </label>
          <input
            id="upload-button"
            type="file"
            accept="image/*"
            capture="environment" // 在支持的設備上，允許直接拍攝照片
            style={{ display: 'none' }} // 隱藏默認的文件選擇器
            onChange={handlePhotoUpload} // 當用戶選擇照片時觸發handlePhotoUpload
          />
        </div>
      )}

      {/* 顯示已上傳的照片和重新選擇照片的按鈕 */}
      {photo && (
        <div style={{ marginTop: '20px' }}>
          <img src={photo} alt="Uploaded" style={{ width: '100%', maxWidth: '400px' }} />
          {/* 重新選擇照片的按鈕 */}
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleChooseAnotherPhoto}>Choose Another Photo</button>
          </div>
        </div>
      )}

      {/* 如果有照片，顯示SEND按鈕 */}
      {photo && (
        <div style={{ marginTop: '20px' }}>
          <button>Send</button> {/* SEND按鈕，功能尚未實現 */}
        </div>
      )}

      {/* 返回主頁的按鈕 */}
      <div style={{ marginTop: '20px' }}>
        <a href="/">
          <button>Back to Main Page</button>
        </a>
      </div>
    </div>
  );
};

export default PhotoPage;
