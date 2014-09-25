/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var Label = React.createClass({

  propTypes: {
    schema: React.PropTypes.object,
    label: React.PropTypes.string
  },

  render: function() {
    var schema = this.props.schema;
    var label = this.props.label ? this.props.label : schema.props.label;
    if (!label) {
      return <span />;
    }
    return this.transferPropsTo(
      <label className="rf-Label">
        {label}
      </label>
    );
  }
});

module.exports = Label;
