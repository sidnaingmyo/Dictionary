import React from 'react';

const Definitions = ({sense}) => {

    return(
        sense.map(item => {
            return <div>{item.definitions[0]}</div> }
            )
      
    )

  

}
export  default Definitions;