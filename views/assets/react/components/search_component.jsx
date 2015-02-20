
/** @jsx React.DOM **/

var SearchModel = models.search();
search = new SearchModel();

var SearchForm = React.createClass({
  getInitialState: function() {
    return {
      pristine: true,
      valid: true
    }
  },
  componentWillMount: function() {
    if (this.props.filters) {
      search.loadPreviousSearch(this.props.filters);
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return (
      <div id="SearchForm">
        <h1>Search Form</h1>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <TextField label="Search Name" name="uniqueId"/>
          <LocationForm />
          <PriceForm />
          <Filters name="Neighborhood" type="neighborhood" exampleKey="Alberta Arts District" exampleScore="20"/>
          <Filters name="Keyword" type="keyword" exampleKey="music" exampleScore="30"/>
          <div id="submit">
            <input id="submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
});

var TextField = React.createClass({
  getInitialState: function() {
    return {userInput: search.getField(this.props.name)}
  },
  handleChange: function(e) {
    var userInput = e.target.value
    this.setState({userInput: userInput}, function() {
      search.setField(this.props.name, userInput);
    });
  },
  render: function() {
    var id = this.props.name + '_field';
    return (
      <div className="formField">
        <label>{this.props.label}: </label>
        <input type="text" id={id}
                    name={this.props.name}
                    value={this.state.userInput}
                    onChange={this.handleChange} />
      </div>
    );
  }
});

var LocationForm = React.createClass({
  render: function() {
    return (
      <div id="locationForm" className="formSegment">
        <TextField label="City" name="city" />
        <TextField label="County" name="county" />
      </div>
    );
  }
});

var PriceForm = React.createClass({
  render: function() {
    return (
      <div id="priceForm" className="formSegment">
        <TextField label="Min. Price" name="minPrice" />
        <TextField label = "Max Price" name="maxPrice" />
      </div>
    );
  }
});

var Filters = React.createClass({
  getInitialState: function () {
    return {
      filters : search.getField(this.props.type + 's')
    };
  },
  handleChange: function(e) {
    var index = e.target.name.substring(e.target.name.length - 1),
        property = e.target.classList[0],
        value = e.target.value,
        filters = this.state.filters;

    filters[index][property] = value;
    this.setState({filters: filters}, function() {
      var key = this.props.type + 's';
      search.setField(key, this.state.filters);
    });
  },
  addFilter: function() {
    var filters = this.state.filters,
        newFilter = {name: '', score: ''};
    filters.push(newFilter)
    this.setState({filters: filters}, function() {
      var key = this.props.type + 's';
      search.setField(key, this.state.filters);
    });
  },
  render: function() {
    //generate filter inputs
    var FilterNodes = this.state.filters.map(function(filter, index, arr) {
      var inputNames = {
        filterName: this.props.type + "_name_" + index,
        filterScore: this.props.type + "_name_" + index
      };
      return (
        <div className="neighborhood" key={index}>
          <label>{this.props.name}: </label>
          <input placeholder={this.props.exampleKey}
                 type="text"
                 name={inputNames.filterName}
                 value={filter.slug}
                 onChange={this.handleChange}
                 className="key" />
          <label> Score: </label>
          <input placeholder={this.props.exampleScore}
                 type="text"
                 name={inputNames.filterScore}
                 value={filter.points}
                 onChange={this.handleChange}
                 className="score"/>
        </div>
      )
    }.bind(this));

    return (
      <div id={this.props.type} className="filters">
        <h2>{this.props.name}s</h2>
        {FilterNodes}
        <button type="button" id="addFilter" onClick={this.addFilter}>Add {this.props.name}</button>
      </div>
    );
  }
});


var KeywordForm = React.createClass({
  render: function() {
    return (
      <div id="keywordForm" className="formSegment">
        <button id="addKeyword">Add Keyword</button>
      </div>
    );
  }
});
