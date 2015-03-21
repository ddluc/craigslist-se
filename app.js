/**
 * Room Share Finder
 * Custom craigslist room share finder and notification system
 **/

var express = require('express'),
    controllers = require('./controllers');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/assets'));


app.get('/', controllers.home);
app.get('/scrape', controllers.scrape);
app.get('/results', controllers.results);

app.listen(3000, function(err) {
  if (!err) console.log('App is listening on port 3000');
  else console.log(err);
});
