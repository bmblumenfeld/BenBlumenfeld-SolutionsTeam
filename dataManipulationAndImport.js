require('dotenv').config();
const algoliaSearch = require('algoliasearch');
const csvtojson = require('csvtojson');
const {chunk} = require('lodash');
const converter = csvtojson({ delimiter:";", toArrayString:true });
const appId = `${process.env.ALGOLIA_APP_ID}`;
const apiKey = `${process.env.ADMIN_API_KEY}`;
let client = algoliaSearch(appId, apiKey);
const index = client.initIndex('restaurants');
const restaurantsList = require('./project-files/resources/dataset/restaurants_list.json');
const rInfoPath = './project-files/resources/dataset/restaurants_info.csv';

converter
.fromFile(rInfoPath)
.then((infoArr)=>{
  
  let totalInfo = restaurantsList.map(x => Object.assign(x, infoArr.find(y => Number(y.objectID) === x.objectID)));

  const chunks = chunk(totalInfo, 500);

  chunks.map(function(batch) {
    return index.addObjects(batch, function(err, content) {
      if(err) {
          console.error('err');
      }
      });
  });

})
index.setSettings({
  hitsPerPage: 3,
  attributesForFaceting: ['food_type', 'stars_count', 'payment_options', 'price_range'],
  searchableAttributes: [
    'name',
    'city',
    'country',
    'iata_code',
    'food_type',
    'stars_count', 
    'payment_options', 
    'pricepayment_options', 
    'price_range'
  ],
  maxValuesPerFacet: 10,
  paginationLimitedTo: 0,
  }, function(err) {
    if (!err) {
    console.log('success');
    }
});
