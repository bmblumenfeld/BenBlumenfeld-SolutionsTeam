import algoliaSearch from 'algoliasearch';
import algoliaSearchHelper from 'algoliasearch-helper';
import React from 'react';

class Search extends React.Component{
    constructor(props){
        super(props)
    
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e){
        
        
    }

    render(){
        return(
            <div className="searchbox">
                <input 
                  className="searchbar"
                  onChange={this.handleSearch}>
                </input>
            </div>
        );
    }
}

export default Search;