
var models = {

  search : function() {

    function Search() {
      this.uniqueId = '';
      this.minPrice = '';
      this.maxPrice = '';
      this.city = '';
      this.county = '';
      this.neighborhoods = [];
      this.keywords = [];
    }

    Search.prototype.setField = function(field, value) {
      this[field] = value
    };

    Search.prototype.loadPreviousSearch = function(searchParams) {
      this.name = searchParams.name;
      this.price = searchParams.price;
      this.location = searchParams.location;
      this.neighborhoods = searchParams.neighborhoods;
      this.keywords = searchParams.keywords
    };

    Search.prototype.submit = function() {
      //max request!
    };

    return Search;

  }

}
