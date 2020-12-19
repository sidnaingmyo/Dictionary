import React from 'react';
import { Container } from 'react-bootstrap';

const SearchBar = (props) => {
  return (
    <div className='ui segment bg-primary'>
      <form className='ui form'>
        <div className='ui action input'>
          <input
            type='text'
            value={props.searchterm}
            onChange={props.onhandleSubmit}
            placeholder='Enter'
          />

          <button class='ui button' onClick={props.onSearchSubmit}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
