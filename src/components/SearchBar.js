import React from 'react';

const SearchBar = ({ searchterm, onhandleSubmit, onSearchSubmit }) => {
  return (
    <div className='ui segment'>
      <form className='ui form'>
        <div className='ui action input'>
          <input type='text' value={searchterm} onChange={onhandleSubmit} placeholder='Enter' />

          <button className='ui button' onClick={onSearchSubmit}>
            <i className='search icon'></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
