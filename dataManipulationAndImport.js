const algoliaSearch = require('algoliasearch');
const csvtojson = require('csvtojson');
const converter = csvtojson({ delimiter:";", toArrayString:true });
const {chunk} = require('lodash')
const fs = require('fs');
const appId = 'AV3MD25BGV';
const apiKey = 'b80526ff55201410551970c94d92b0d0';
let client = algoliaSearch(appId, apiKey);
const index = client.initIndex('restaurants');
const restaurantsList = require('./project-files/resources/dataset/restaurants_list.json');
const rInfoPath = './project-files/resources/dataset/restaurants_info.csv'

converter
.fromFile(rInfoPath)
.then((infoArr)=>{
  
  let totalInfo = restaurantsList.map(x => Object.assign(x, infoArr.find(y => Number(y.objectID) === x.objectID)));

  const chunks = chunk(totalInfo, 10);

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
