
var cheerio = require('cheerio'),
    _ = require('underscore'),
    request = require('request'),
    q = require('q');


module.exports = function(listings, query) {

  var gettingListingDetailsFromCraigslist = q.defer();

  _.each(listings, function(listing, index, listingsArr) {

    var url = 'http://'+ query.city + '.craigslist.org' + listing.href;

    request(url, function(err, response, html) {
      if (err) gettingListingDetailsFromCraigslist.reject(err);
      var $ = cheerio.load(html);

      /**
       * get the body of the post
       **/

       listing.postBody = $('#postingbody').html();
       listing.image = $($('.tray').find('img')).attr('src');
       listing.fullUrl = url;

       if (index == listingsArr.length - 1) {
           gettingListingDetailsFromCraigslist.resolve(listings);
       }

    });

  });

  return gettingListingDetailsFromCraigslist.promise;

}
