import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import ResultList from './ResultList';
import Definitions from './Definitions';
import Translate from './Translate';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../index.css';

const App = () => {
  const [searchterm, setSearchterm] = useState('');
  const [sameWord, setSameWord] = useState([]);

  const [sense, setSense] = useState([]);
  const onhandleSubmit = (e) => {
    e.preventDefault();
    setSearchterm(e.target.value);
  };
  const handleClick = async (e) => {
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
      setSense(data.data.results[0].lexicalEntries[0].entries[0].senses);
    });
  };
  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: `/search/thesaurus/en?q=${searchterm}&prefix=false`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        app_id: 'bf3c5c8d',
        app_key: 'a1f99c5cb4c3aa6293ce631a18ffbfc9',
      },
    };
    await axios(config).then((data) => setSameWord([data]));
  };

  return (
    <div className='ui container' style={{ marginTop: '10px' }}>
      <Router>
        <div className='ui secondary pointing menu'>
          <Link to='/' className='item'>
            Dictionary
          </Link>
          <Link to='/translate' className='item'>
            Translater
          </Link>
        </div>
        <Switch>
          <Route path='/translate'>
            <Translate />
          </Route>
          <Route path='/'>
            <div>
              <SearchBar
                searchterm={searchterm}
                onhandleSubmit={onhandleSubmit}
                onSearchSubmit={onSearchSubmit}
              />
            </div>
            <div className='ui grid' style={{ marginTop: '10px' }}>
              <div className='ten wide column'>
                <ListGroup>
                  <ListGroupItem>
                    <ResultList sameWord={sameWord} onClick={handleClick} />
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div className='six wide column'>
                <ListGroup>
                  <ListGroupItem>
                    <Definitions sense={sense} />
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
