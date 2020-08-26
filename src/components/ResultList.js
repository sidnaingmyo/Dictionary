import React from 'react';
import { Col } from 'react-bootstrap';
import Result from './Result'

const ResultList = ({sameWord,onClick}) => {
    return (
        <div>
        <Col xs="4">
        {
           sameWord.map((word) => {
               return word.data.results.map(item=>(<Result onClick={onClick} item={item}/>))
           })
           
        }
       
        </Col>
        </div>
    )

}
export default ResultList;