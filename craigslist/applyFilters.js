/**
 * craigslist/applyFilters
 **/

var q = require('q'),
    _ = require('underscore');
    fs = require('fs');

module.exports = function(listings) {

  var filteringListings = q.defer();

  var results = []

  fs.readFile('./data/filters.json', function(err, data) {

    if (err) filteringListings.reject(err);

    var filters = JSON.parse(data);

    _.each(listings, function(listing, index, listingsArr) {

      var score = 0,
          matches = {
            price: false,
            neighborhoods: [],
            keywords : []
          };

      /**find listings in price range **/
      if (listing.price) {
        //remove the dollar sign from the price
        var price = parseInt(listing.price.slice(1));
        if (price >= filters.min_price && price <= filters.max_price) {
          score+=20;
          matches.price = true;
        }

      }

      /** find matching neighboorhoods **/
      if (listing.neighborhood && listing.postBody) {

        var neighborhoods = filters.neighborhoods;

        _.each(neighborhoods, function(neighborhood, index, neighborhoodsArr) {

        if (listing.neighborhood.toLowerCase().search(neighborhood.slug) != -1) {
          score+= neighborhood.points;
          matches.neighborhoods.push(neighborhood.slug);
        }

        else if(listing.title.toLowerCase().search(neighborhood.slug) != -1) {
          score+= neighborhood.points;
          matches.neighborhoods.push(neighborhood.slug);
        }

        else if (listing.postBody.toLowerCase().search(neighborhood.slug) != -1) {
          score += neighborhood.points / 3
          matches.keywords.push(neighborhood.slug);
        }

        });

      }


      /** find matching keywords **/

      if (listing.postBody) {

        var keywords = filters.keywords;
        _.each(keywords, function(keyword, index, keywordsArr) {

          if (listing.postBody.toLowerCase().search(keyword.slug) != -1) {
            score += keyword.points
            matches.keywords.push(keyword.slug);
          }

        });

      }


      listing.score = Math.floor(score);
      listing.matches = matches;

      if (index == listingsArr.length - 1) {
        listings = _.sortBy(listings, function(listing) {
          return listing.score * -1;
        });
        filteringListings.resolve(listings);
      }

    });

  });


  return filteringListings.promise;

};
