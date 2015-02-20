
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

    Search.prototype.getField = function(field) {
      return this[field];
    }

    Search.prototype.loadPreviousSearch = function(searchParams) {
      this.uniqueId = searchParams.id;
      this.minPrice = searchParams.min_price;
      this.maxPrice = searchParams.max_price;
      this.city = searchParams.city;
      this.county = searchParams.county;
      this.neighborhoods = searchParams.neighborhoods;
      this.keywords = searchParams.keywords
    };

    Search.prototype.submit = function() {

    };

    return Search;

  }

}
