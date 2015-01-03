/**
 * craigslist/getListings
 *
 */

var cheerio = require('cheerio'),
    _ = require('underscore'),
    request = require('request'),
    q = require('q');

module.exports =  function() {

  var fetchingListingsFromCraigslist = q.defer();

  var url = 'http://portland.craigslist.org/search/mlt/roo?'
  var  listings = [];
  request(url, function(err, response, html) {
    if (err) defer.reject(err);
    var $ = cheerio.load(html);
    $rows = $('.row');
    _.each($rows, function(row, index, rowsArr) {

      var $row = $(row),
          newListing = {};

      /**
       * pull the useful data from the listings html using a variety of methods!
       **/

      newListing.title = $($row.find('.hdrlnk')).html();
      newListing.href = $($row.find('.hdrlnk')).attr('href');
      newListing.time = $($row.find('time')).attr('datetime');
      newListing.price = $($row.find('.price')).html();
      newListing.neighborhood = $($row.find('small')).html();

      listings.push(newListing);

      //when all elements have been searched
      if (index == rowsArr.length -1) {
        fetchingListingsFromCraigslist.resolve(listings);
      }

    });

  });

  return fetchingListingsFromCraigslist.promise;

}
