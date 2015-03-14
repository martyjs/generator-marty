'use strict';
var str = require('underscore.string');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('Marty v0.9') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      default: this.appname,
      message: 'Whats the name of your project?',
      validate : function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.displayName = props.name;
      this.name = str.slugify(props.name);

      done();
    }.bind(this));
  },

  writing: {
    config: function () {
      this.template('_gitignore', '.gitignore', this.context);
      this.template('_package.json', 'package.json', this.context);
      this.template('karma.conf.js', 'karma.conf.js', this.context);
      this.template('_nodemonignore', '.nodemonignore', this.context);
    },

    projectfiles: function () {
      this.template('Gruntfile.js', 'Gruntfile.js', this.context);
      this.template('README.md', 'README.md', this.context);

      this.directory('app', 'app', this.context);
      this.directory('bin', 'bin', this.context);
      this.directory('test', 'test', this.context);
      this.directory('build', 'build', this.context);
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      ['components', 'actions', 'queries', 'constants', 'sources', 'stores', 'utils'].forEach(function (folder) {
        this.mkdir('app/' + folder);
      }, this);

      this.fs.copy(
        this.templatePath('app/server/views/index.ejs'),
        this.destinationPath('app/server/views/index.ejs')
      );

      var html = this.read('app/server/views/index.ejs').replace(/<%= name %>/g, this.name);
      this.write('app/server/views/index.ejs', html);
    }
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
