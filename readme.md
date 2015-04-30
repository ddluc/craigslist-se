#Craigslist Apartment / Roommate Finder

To run locally:

`npm install` && `node app.js`


## Configure Your Query



```json
{
  "city": "portland",
  "county": "mlt",
  "type": "roo",
  "filters" : {
    "max_price": 800,
    "min_price": 400,
    "neighborhoods": [
      {"name": "buckman", "points": 15},
      ....
    ],
    "keywords": [
      {"slug": "music", "points": 10},
      ....
    ]
  }
}
```

The `city`, `county`, and `type` are all components of the url you want to search against.

##Collect Data
`/scrape` will scrape the data for the 100 most recent listings and save them as a json file


#TODOS:

1. build results ui for easier consuming of data
2. build filters ui for creation of filters
3. add ability to search older listings (right now it's just the first 100)
4. add user system to so on instance of the app could be used by many
5. create a more flexible filtering system
