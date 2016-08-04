document.ondragover = document.ondrop = function(e) {
  e.preventDefault();
  return false;
};

window.onload = function() {
  var Contents, FileView, MainView, PropertyView, React, ReactDOM, Timeline, ipcRenderer, remote;
  remote = require('electron').remote;
  ipcRenderer = require('electron').ipcRenderer;
  React = require('react');
  ReactDOM = require('react-dom');
  MainView = require('./js/renderer/MainView');
  FileView = require('./js/renderer/FileView');
  PropertyView = require('./js/renderer/PropertyView');
  Timeline = require('./js/renderer/Timeline');
  Contents = React.createClass({
    setProperty: function(type, item) {
      return this.setState({
        type: type,
        item: item
      });
    },
    getInitialState: function() {
      return {
        projectPath: null,
        type: null,
        item: null
      };
    },
    componentDidMount: function() {
      ipcRenderer.on('requestPath-reply', (function(_this) {
        return function(err, path) {
          if (err != null) {
            console.log(err);
          }
          console.log(path);
          return _this.setState({
            projectPath: path
          });
        };
      })(this));
      ipcRenderer.send('requestPath-message', '');
      return ipcRenderer.on('capture', (function(_this) {
        return function(err, type) {
          return console.log(type);
        };
      })(this));
    },
    render: function() {
      return React.createElement("div", {
        "id": "Contents"
      }, React.createElement(MainView, {
        "path": this.state.projectPath
      }), React.createElement(FileView, {
        "path": this.state.projectPath,
        "Action": {
          setProperty: this.setProperty
        }
      }), React.createElement(PropertyView, {
        "type": this.state.type,
        "item": this.state.item
      }), React.createElement(Timeline, null));
    }
  });
  return ReactDOM.render(React.createElement(Contents, null), document.getElementById('Top'));
};
