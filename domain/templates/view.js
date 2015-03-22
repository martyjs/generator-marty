var React = require('react');
var Marty = require('marty');
var <%= storeName %> = require('../stores/<%= storeFileName %>');

var <%= viewName %> = React.createClass({
  render() {
    var <%= name %> = this.props.<%= name %>;

    return <div className='<%= name %>'>{<%= name %>}</div>;
  }
});

module.exports = Marty.createContainer(<%= viewName %>, {
  listenTo: [<%= storeName %>],
  fetch: {
    <%= name %>() {
      return <%= storeName %>.for(this).getById(this.props.id);
    }
  },
  pending() {
    return <div className='loading'>Loading</div>;
  },
  failed(error) {
    return <div className='error'>{error}</div>;
  }
});