/**
 * middleware/index.js
 */

 var fs = require('fs')

 module.exports = {

 loadQuery: function(req, res, next) {

   fs.readFile('./data/query.json', function(err, data) {

     if (err) res.status(500).send('No query.json file found. Please refer to readme for instructions')

      var query = JSON.parse(data);
      req.query = query;

      next()

   });

 }

 }
