
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
