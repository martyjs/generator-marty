var React = require('react');
var Marty = require('marty');
var <%= storeName %> = require('stores/<%= storeFileName %>');

var <%= componentName %>State = Marty.createStateMixin({
  listenTo: [<%= storeName %>],
  getState: function () {
    return {
      <%= name %>: <%= storeName %>.getById(this.props.id)
    };
  }
});

var <%= componentName %> = React.createClass({
  mixins: [<%= componentName %>State],
  render: function () {
    return this.state.<%= name %>.when({
      pending: function () {
        return <div className='loading'>Loading</div>;
      },
      error: function (error) {
        return <div className='error'>{error.message}</div>;
      },
      done: function (<%= name %>) {
        return <div className='<%= name %>'>{<%= name %>}</div>;
      }
    });
  }
});

module.exports = <%= componentName %>;