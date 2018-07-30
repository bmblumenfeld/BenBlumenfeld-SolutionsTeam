import algoliaSearch from 'algoliasearch';
import algoliaSearchHelper from 'algoliasearch-helper';
import React from 'react';
import Stars from 'react-star-rating-component';


const appId = 'AV3MD25BGV';
const apiKey = '87364777a777a009121d20172c0aa9a4';
const indexName = 'restaurants';

const client = algoliaSearch(appId, apiKey);

const helper = algoliaSearchHelper(
    client, indexName, {
      facets: ['food_type', 'stars_count', 'payment_options', 'price_range','price'],
      hitsPerPage: 3,
    }
  );
helper.setQueryParameter('aroundLatLngViaIP',true);
const Provider = reactAlgoliaSearchHelper.Provider;
const connect = reactAlgoliaSearchHelper.connect;

const SearchBox = connect()(
    ({helper}) =>
    <div className="search-box">
      <input
        className="search-input"
        placeholder="Search for Restaurants by Name, Cuisine, Location"
        onChange={e => helper.setQuery(e.target.value).search()}
      />
    </div>
  );

const getHighlighted = s => ({__html: s});

const Hit = ({hit}) => (
    <div className="hit" >
      <div className="image">
        <img src={hit.image_url}></img>
      </div>
      <div className="details">
        <div className="name"><strong>{hit.name}</strong></div>
        <div className="upper-details">
        <div className="stars">{hit.stars_count}&nbsp;</div>
          <Stars 
              starCount={5}
              value={hit.stars_count}
              emptyStarColor={'rgb(150, 150, 150)'}
          />
          <div className="reviews">({hit.reviews_count} reviews)</div>
        </div>
        <div className="lower-details">
            <div className="food-type">{hit.food_type}&nbsp;|&nbsp;</div>
            <div className="neighborhood">{hit.neighborhood}&nbsp;|&nbsp;</div>
            <div className="price">{hit.price_range}</div><br />
        </div>
      </div>
    </div>
  );

const Hits = connect(state => ({results: state.searchResults}))(
    ({results}) => results &&
      <div className="hits">
        <span>{`${results.nbHits} results found in ${results.processingTimeMS / 1000} seconds `}<hr/></span>
        {results.hits.map((hit) => 
          <Hit key={hit.objectID} hit={hit} {...hit} />
        )}
      </div>
  );  
const Pagination = connect(({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}))(
  ({page, nbPages, helper}) =>
    page === 0? <div className="pager">
     <button  
      onClick={e => helper.setPage(page + 1).search()} 
      disabled={page + 1 >= nbPages}>Show More</button> 
      </div> :
    <div className="pager">
      <button 
      onClick={e => helper.setPage(page - 1).search()} 
      disabled={page === 0}>Previous</button>
      <button  
      onClick={e => helper.setPage(page + 1).search()} 
      disabled={page + 1 >= nbPages}>Show More</button>
    </div>
);
const Category = ({name, count, isRefined, handleClick}) => (
        <div onClick={handleClick} className="category">
          <span className="category-name">{name}</span>
          <span className="badge">{count}</span>
        </div>
  )

const Categories = connect(state => ({ 
    categories: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) || [] }) )(
    ({categories, helper}) =>
      <div>
        <h3>Cuisine/Food Type</h3>
        {categories.map(
          category =>
            <Category
              key={category.name}
              {...category}
              handleClick={()=> helper.toggleRefine('food_type', category.name).search()}
            />
        )}
        <h3>Price</h3>
            <div className="price-buttons">
                <button onClick={()=>helper.toggleRefine('price', 1).search()}className="price-button">$</button>
                <button onClick={()=>helper.toggleRefine('price', 2).search()}className="price-button">$$</button>
                <button onClick={()=>helper.toggleRefine('price', 3).search()}className="price-button">$$$</button>
                <button onClick={()=>helper.toggleRefine('price', 4).search()}className="price-button">$$$$</button>
            </div>
      </div>
  );

  

class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        // navigator.geolocation.getCurrentPosition(()=>{console.log('success')},()=>{console.log('failed')})
        helper.search();
    }

    render(){
        return (
            <Provider helper={helper}>
                <div className = "container">
                    <SearchBox/>
                    <div className="results-content">
                        <div className="catagories">
                            <Categories/>
                        </div>
                        <div className="results">
                            <Hits/>
                            <Pagination/>    
                        </div>
                     </div>
                </div>
            </Provider>
        );
    }


}

export default App;