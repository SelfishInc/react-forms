/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var Hint = React.createClass({
    render: function() {
        var schema = this.props.schema;
        var hint = this.props.hint ? this.props.hint : schema.props.hint;
        if (!hint) {
            return <span />;
        }
        return this.transferPropsTo(
          <span className="rf-Hint">
            {hint}
          </span>
        );
    }
})

module.exports = Hint
