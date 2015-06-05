import Ember from 'ember';
import layout from '../templates/components/weekly-event';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  event: null,
  classNames: ['event'],
  attributeBindings: ['style'],

  style: Ember.computed(function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(
      `bottom: ${escape(this.calculateBottom())}%;
       top: ${escape(this.calculateTop())}%;`
    );
  }),

  calculateBottom() {
    return this._calculatePercentage(this.event.date);
  },

  calculateTop() {
    return this._calculatePercentage(this.event.endDate);
  },

  _calculatePercentage(date) {
    let momentDate = moment(date);
    let hours = momentDate.hours();
    let minutes = momentDate.minutes();
    let minutesConverted = hours * 60;
    let totalMinutes = minutes + minutesConverted;
    let ratio = totalMinutes / 1440;
    let percentage = ratio * 100;
    return Math.floor(percentage * 1000) / 1000;
  }
});
