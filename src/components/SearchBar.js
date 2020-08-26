import React from 'react';
import { Container } from 'react-bootstrap';


const SearchBar= (props)=>{
return(
    <Container>
    <form >
    <input
    type="text"
    value={props.searchterm}
    onChange={props.onhandleSubmit}
    placeholder="Enter" />
    <button onClick={props.onSearchSubmit}>CLick</button>

    </form>
    
    </Container>
)}

export default SearchBar;