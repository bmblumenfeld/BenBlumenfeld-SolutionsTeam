import algoliaSearch from 'algoliasearch';
import algoliaSearchHelper from 'algoliasearch-helper';
import React from 'react';

const appId = 'AV3MD25BGV';
const apiKey = '87364777a777a009121d20172c0aa9a4';
const indexName = 'restaurants_LIST';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {queryString:''}
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e){
        let client = algoliaSearch(appId, apiKey);
        let helper = algoliaSearchHelper(client, indexName);
        
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