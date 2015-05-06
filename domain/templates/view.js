var React = require('react');
var Marty = require('marty');

var <%= viewName %> = React.createClass({
  render() {
    var <%= name %> = this.props.<%= name %>;

    return <div className='<%= name %>'>{<%= name %>}</div>;
  }
});

module.exports = Marty.createContainer(<%= viewName %>, {
  listenTo: ['<%= storeFileName %>'],
  fetch: {
    <%= name %>() {
      return this.app.<%= storeFileName %>.getById(this.props.id);
    }
  },
  pending() {
    return <div className='loading'>Loading</div>;
  },
  failed(error) {
    return <div className='error'>{error}</div>;
  }
});