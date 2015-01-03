
var cheerio = require('cheerio'),
    _ = require('underscore'),
    request = require('request'),
    q = require('q');


module.exports = function(listings) {

  var gettingListingDetailsFromCraigslist = q.defer();

  _.each(listings, function(listing, index, listingsArr) {

    var url = 'http://portland.craigslist.org' + listing.href;

    request(url, function(err, response, html) {
      if (err) defer.reject(err);
      var $ = cheerio.load(html);

      /**
       * get the body of the post
       **/

       listing.postBody = $('#postingbody').html();

       if (index == listingsArr.length - 1) {
           gettingListingDetailsFromCraigslist.resolve(listings);
       }

    });

  });

  return gettingListingDetailsFromCraigslist.promise;

}
