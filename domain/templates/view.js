var React = require('react');
var Marty = require('marty');
var <%= storeName %> = require('../stores/<%= storeFileName %>');

var <%= viewName %>State = Marty.createStateMixin({
  listenTo: [<%= storeName %>],
  getState: function () {
    return {
      <%= name %>: <%= storeName %>.for(this).getById(this.props.id)
    };
  }
});

var <%= viewName %> = React.createClass({
  mixins: [<%= viewName %>State],
  render: function () {
    return this.state.<%= name %>.when({
      pending: function () {
        return <div className='loading'>Loading</div>;
      },
      failed: function (error) {
        return <div className='error'>{error.message}</div>;
      },
      done: function (<%= name %>) {
        return <div className='<%= name %>'>{<%= name %>}</div>;
      }
    });
  }
});

module.exports = <%= viewName %>;