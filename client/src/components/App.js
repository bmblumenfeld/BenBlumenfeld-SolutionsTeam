import algoliaSearch from 'algoliasearch';
import algoliaSearchHelper from 'algoliasearch-helper';
import React from 'react';
// import {connect} from 'react-algoliasearch-helper';
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
    <div className="search-container">
      <input
        className="search-box"
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
          <div className="reviews">&nbsp;({hit.reviews_count} reviews)</div>
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
    <div className="pager">
      <button className="next" 
      onClick={e => helper.setPage(page + 1).search()} 
      disabled={page + 1 >= nbPages}>Show More</button>
    </div>
);
const Category = ({name, count, isRefined, handleClick}) => (
    <div>
      <li>
        <div onClick={handleClick} className="category">
          <div><span className="category-name">{name}&nbsp;</span></div>
          <div><span className="badge">{count}</span></div>
        </div>
      </li>
    </div>
  )

const Categories = connect(state => ({ 
    categories: state.searchResults &&
      state.searchResults.getFacetValues('food_type', {sortBy: ['count:desc', 'selected']}) || [] }) )(
    ({categories, helper}) =>
      <ul className="categories">
        <h3>Cuisine/Food Type</h3>
        {categories.map(
          category =>
            <Category
              key={category.name}
              {...category}
              handleClick={()=> helper.toggleRefine('food_type', category.name).search()}
            />
        )}
        <h3>Rating</h3>
      </ul>
  );

  

class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log(helper.getQuery().query === '')
        console.log(navigator)
        navigator.geolocation.getCurrentPosition(()=>{console.log('success')},()=>{console.log('failed')})
    }

    render(){
        return (
            <Provider helper={helper}>
                <div className = "container">
                    <SearchBox/>
                    <Hits/>
                    <Pagination/>
                    <Categories/>
                </div>
            </Provider>
        );
    }


}

export default App;