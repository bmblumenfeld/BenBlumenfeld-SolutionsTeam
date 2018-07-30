import React from 'react';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

class Restaurants extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            restaurants: ['CBK', 'Mia\'s', 'COK', 'CGK'  ]
        }
    }
    
    render(){
        return(
            <div>
                {this.state.restaurants.map((restaurant)=>{
                    return <div>{restaurant}</div>
                })}
            </div>
        )
    }
}

export default Restaurants;


