#Craigslist Roommate Finder

To run locally:

`npm install` && `node app.js`

##Collect Data
`/scrape` will scrape the data for the 100 most recent listings and save them as a json file

##Filtering Results
`/results` will return the listings sorted by their "score". Using the /data/filters.json file, in which you assign point values to certain keyword hits and criteria

#TODOS:

1. build results ui for easier consuming of data
2. build filters ui for creation of filters
3. add ability to search older listings (right now it's just the first 100)
4. add user system to so on instance of the app could be used by many
5. create a more flexible filtering system
