import React from 'react';
import Result from './Result';

const ResultList = ({ sameWord, onClick }) => {
  return (
    <div className='text-danger'>
      {sameWord.map((word) => {
        return word.data.results.map((item) => <Result onClick={onClick} item={item} />);
      })}
    </div>
  );
};
export default ResultList;
