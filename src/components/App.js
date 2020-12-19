import React from 'react';
import SearchBar from './SearchBar';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import ResultList from './ResultList';
import Definitions from './Definitions';

class App extends React.Component {
  state = {
    searchterm: '',
    sameWord: [],
    value: '',
    sense: [],
  };

  onhandleSubmit = (e) => {
    e.preventDefault();
    this.setState({ searchterm: e.target.value });
  };

  handleClick = async (e) => {
    const value = e.target.innerHTML;
    const config = {
      url: `/entries/en-gb/${value}?fields=definitions,variantForms&strictMatch=false`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        app_id: 'bf3c5c8d',
        app_key: 'a1f99c5cb4c3aa6293ce631a18ffbfc9',
      },
    };
    await axios(config).then((data) => {
      this.setState({
        ...this.state,

        sense: data.data.results[0].lexicalEntries[0].entries[0].senses,
      });
    });
    console.log('sense..', this.state.sense);
  };

  onSearchSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: `/search/thesaurus/en?q=${this.state.searchterm}&prefix=false`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        app_id: 'bf3c5c8d',
        app_key: 'a1f99c5cb4c3aa6293ce631a18ffbfc9',
      },
    };
    await axios(config).then((data) => this.setState({ sameWord: [data] }));
  };
  render() {
    return (
      <div className='ui container' style={{ marginTop: '10px' }}>
        <div>
          <SearchBar
            searchterm={this.state.searchterm}
            onhandleSubmit={this.onhandleSubmit}
            onSearchSubmit={this.onSearchSubmit}
          />
        </div>
        <div class='ui grid' style={{ marginTop: '10px' }}>
          <div className='ten wide column'>
            <ListGroup>
              <ListGroupItem>
                <ResultList sameWord={this.state.sameWord} onClick={this.handleClick} />
              </ListGroupItem>
            </ListGroup>
          </div>
          <div class='six wide column'>
            <ListGroup>
              <ListGroupItem>
                <Definitions sense={this.state.sense} />
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
