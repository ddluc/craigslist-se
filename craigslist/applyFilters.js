/**
 * craigslist/applyFilters
 **/

var q = require('q'),
    _ = require('underscore');

module.exports = function(listings) {

  var filteringListings = q.defer();

  var results = []

  _.each(listings, function(listing, index, listingsArr) {

    var score = 0,
        matches = {
          price: false,
          neighborhoods: {},
          keywords : {}
        };

    /**find listings in price range **/
    if (listing.price) {
      //remove the dollar sign from the price
      var price = parseInt(listing.price.slice(1));
      if (price >= this.filters.min_price && price <= this.filters.max_price) {
        score+=20;
        matches.price = true;
      }

    }

    /** find matching neighboorhoods **/
    if (listing.neighborhood && listing.postBody) {
      var neighborhoods = this.filters.neighborhoods;

      _.each(neighborhoods, function(neighborhood, index, neighborhoodsArr) {

      if (listing.neighborhood.toLowerCase().search(neighborhood.name) != -1) {
        score+= neighborhood.points
        matches.neighborhoods[neighborhood.name] = true;
      }

      else if(listing.title.toLowerCase().search(neighborhood.name) != -1) {
        score+= neighborhood.points
        matches.neighborhoods[neighborhood.name] = true;
      }

      else if (listing.postBody.toLowerCase().search(neighborhood.name) != -1) {
        score += neighborhood.points / 3
        matches.neighborhoods[neighborhood.name] = 'mentioned';
      }

      });

    }


    /** find matching keywords **/

    if (listing.postBody) {

      var keywords = this.filters.keywords;
      _.each(keywords, function(keyword, index, keywordsArr) {

        if (listing.postBody.toLowerCase().search(keyword.slug) != -1) {
          score += keyword.points
          matches.keywords[keyword.slug] = true
        }

      });

    }


    listing.score = score;
    listing.matches = matches;

    if (index == listingsArr.length - 1) {
      listings = _.sortBy(listings, function(listing) {
        return listing.score * -1;
      });
      filteringListings.resolve(listings);
    }

  }.bind(this));


  return filteringListings.promise;

};
