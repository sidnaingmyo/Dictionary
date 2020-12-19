import React from 'react';

const Result = ({ item, onClick }) => {
  return (
    <div>
      <p style={{ cursor: 'pointer' }} onClick={onClick}>
        {item.word}
      </p>
    </div>
  );
};
export default Result;
