React = require 'react'

module.exports = React.createClass
  render: ->
    <div id="MainView">
      <svg>
        <circle id="e1" cx="50" cy="50" r="50" stroke="blue" fill="white" strokeWidth="5"/>
        <circle id="e2" cx="150" cy="50" r="50" stroke="red" fill="white" strokeWidth="5"/>
        <circle id="e3" cx="250" cy="50" r="50" stroke="green" fill="white" strokeWidth="5"/>
      </svg>
    </div>
