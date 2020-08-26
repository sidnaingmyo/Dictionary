import React from 'react';
import SearchBar from './SearchBar';
import { Container ,Row,Col,ListGroup,ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import ResultList from './ResultList';
import Definitions from './Definitions'

class App extends React.Component {
  state = {
    searchterm : '',
    sameWord : [],
    value : '',
    sense : []
  }

onhandleSubmit = (e) => {
  e.preventDefault();
this.setState({searchterm : e.target.value})

}

 handleClick = async (e)=>{
  const value = e.target.innerHTML;
  const config ={
    url : `/entries/en-gb/${value}?fields=definitions,variantForms&strictMatch=false`,
     method:'GET',
     headers:{
      'Accept': 'application/json',
      "app_id": "bf3c5c8d",
      "app_key": "a1f99c5cb4c3aa6293ce631a18ffbfc9"
     },
    }
   await axios(config)
   .then(data=> {
     this.setState({...this.state, 
      
      sense : data.data.results[0].lexicalEntries[0].entries[0].senses
    })
})
console.log("sense..",this.state.sense);
 }

onSearchSubmit = async (e) => {
  e.preventDefault();
const config ={
  url : `/search/thesaurus/en?q=${this.state.searchterm}&prefix=false`,
   method:'GET',
   headers:{
    'Accept': 'application/json',
    "app_id": "bf3c5c8d",
    "app_key": "a1f99c5cb4c3aa6293ce631a18ffbfc9"
   },
  }
 await axios(config)
 .then(data=> this.setState({sameWord : [data]}));
}
  render(){
  
    return(
      <Container>
      <SearchBar 
      searchterm={this.state.searchterm}
      onhandleSubmit={this.onhandleSubmit}
      onSearchSubmit={this.onSearchSubmit}
      />
      <Row >
    <Col xs="4">
    <ListGroup><ListGroupItem>
    <ResultList sameWord={this.state.sameWord} onClick={this.handleClick} />
    
    </ListGroupItem>
    </ListGroup>
    </Col>
    
    <Col xs="6">
    <ListGroup><ListGroupItem>
    
         <Definitions sense={this.state.sense}/> 
    </ListGroupItem>
    </ListGroup>
    </Col>
    </Row>
      
      </Container>
     

    )
  }
  
}

export default App;
