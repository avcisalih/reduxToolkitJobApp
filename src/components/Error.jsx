import React from "react";

const Error = ({ text, retry }) => {
  return (
    <div className="error-container">
      <p>
        Üzgünüz Verilere Erişirken Bir Hata Oluştu ! <span>{text}</span>
      </p>
      <button onClick={retry} className="btn">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
