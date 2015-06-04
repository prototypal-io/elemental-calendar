import Ember from 'ember';
import layout from '../templates/components/weekly-event';

export default Ember.Component.extend({
  layout: layout,
  event: null,
  classNames: ['event'],
  attributeBindings: ['style'],

  style: Ember.computed(function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(
      `left: ${escape(this.calculateLeft())}px;
       top: ${escape(this.calculateTop())}px;`
    );
  }),

  calculateLeft() {
    return 50;
  },

  calculateTop() {
    return 100;
  }
});
