
/** Bootstrap App**/

if (RELOADED) {
  $.ajax({
    url: RELOADED_URL,
    method: 'GET',
    success: function(data) {
      debugger;
      search.loadPreviousSearch(data);
      React.render(
        <SearchForm />,
        document.getElementById('container')
      );
    },
    error: function(err) {
      console.log(err);
    }
  });
} else {
  React.render(
    <SearchForm />,
    document.getElementById('container')
  );
}
