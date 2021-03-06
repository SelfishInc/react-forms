/**
 * `<Element />` component renders form value into one of then `<Field />`,
 * `<Fieldset />` or `<RepeatingFieldset />` component:
 *
 *    <Element value={...} />
 *
 * This component is the main building block for composite form elements such as
 * `<Fieldset />` and `<RepeatingFieldset />` which use it to render its
 * children.
 *
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                         = require('react/addons');
var PropTypes                     = React.PropTypes;
var cloneWithProps                = React.addons.cloneWithProps;
var {ContextTypes}                = require('./FormConfiguration');
var FormPropTypes                 = require('./PropTypes');
var invariant                     = require('./invariant');
var {isList, isMapping, isScalar} = require('./schema');

var Element = React.createClass({

  propTypes: {
    value: FormPropTypes.Value
  },

  contextTypes: ContextTypes,

  render() {
    var value = this.props.value;
    var schema = this.props.value.schema;
    var component = schema.props.get('component');

    if (component) {
      return this.transferPropsTo(
        React.isValidComponent(component) ?
          cloneWithProps(component, {value}) :
          <component value={value} />
      );
    }

    return this.renderElementForSchema(schema);
  },

  renderElementForSchema(schema) {
    var component;
    if (isList(schema)) {
      component = this.context.repeatingFieldsetConstructor || require('./RepeatingFieldset');
    } else if (isMapping(schema)) {
      component = this.context.fieldsetConstructor || require('./Fieldset');
    } else if (isScalar(schema)) {
      component = this.context.fieldConstructor || require('./Field');
    } else {
      invariant(false, 'invalid schema node: ' + schema);
    }
    return this.transferPropsTo(<component value={this.props.value} />);
  }
});

module.exports = Element;
