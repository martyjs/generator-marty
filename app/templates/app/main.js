var React = require('react');
var Marty = require('marty');
var App = require('./index');
var ApplicationContainer = Marty.ApplicationContainer;

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

if (process.env.NODE_ENV !== 'test') {
  var app = new App();

  app.rehydrate();
  app.router.run((Handler, state) => {
    React.render((
      <ApplicationContainer app={app}>
        <Handler {...state.params} />
      </ApplicationContainer>
    ), document.getElementById('app'));
  });
}