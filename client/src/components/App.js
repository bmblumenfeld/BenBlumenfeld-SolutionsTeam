import React from 'react';
import Restaurants from './Restaurants.jsx'
import Search from './Search.jsx'

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className = "container">
                <Search/>
                <Restaurants/>
            </div>
        );
    }


}

export default App;