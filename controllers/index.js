/**
 * controllers/index
 */

 var requireChildren = require('require-children'),
     fs = require('fs');
     craigslist = requireChildren('../craigslist',  module);

 module.exports = {

   scrape: function(req, res) {
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
   },

   results: function(req, res) {
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
   },

   home: function(req, res) {
     res.render('../views/index.ejs', {});
   },


 }
