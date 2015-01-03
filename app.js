/**
 * Room Share Finder
 * Custom craigslist room share finder and notification system
 **/

var express = require('express'),
    requireChildren = require('require-children'),
    fs = require('fs');
    craigslist = requireChildren('./craigslist',  module);

var app = express();

app.get('/scrape', function(req, res) {

  craigslist.getListings().then(function(listings) {
      craigslist.getListingDetail(listings).then(function(listings) {

        fs.writeFile('./data/listings.json', JSON.stringify(listings, null, 4), function(err) {
          if (err) throw err;
          else {
            res.status(200).send({
              status: 'SUCCESS',
              results: listings
            });
          }
        });

      });

    })
    .fail(function(err) {
      res.status(500).send(err);
    });

});

app.get('/results', function(req, res) {

  fs.readFile('./data/listings.json', function(err, data) {
    if (err) res.status(500).send(err)
    else {
      var listings = JSON.parse(data);
      craigslist.applyFilters(listings).then(function(listings) {
        res.status(200).send({
          status: 'SUCCESS',
          results: listings
        });
      });
    }
  })

});


app.listen(3000, function(err) {
  if (!err) console.log('App is listening on port 3000');
  else console.log(err);
});
