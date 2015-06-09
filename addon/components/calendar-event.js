import Ember from 'ember';
import layout from '../templates/components/calendar-event';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  event: null,
  classNames: ['event'],
  attributeBindings: ['style'],

  style: Ember.computed(function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(
      `top: ${escape(this.calculateTop())}%;
       height: ${escape(this.calculateHeight())}%;`
    );
  }),

  calculateTop() {
    return this._calculatePercentageFromTop(this.event.startDate);
  },

  calculateHeight() {
    let percentageDistanceFromTop = this._calculatePercentageFromTop(this.event.endDate);
    let height = percentageDistanceFromTop - this.calculateTop();
    return height;
  },

  _calculatePercentageFromTop(date) {
    let momentDate = moment(date);
    let hours = momentDate.hours();
    let minutes = momentDate.minutes();
    let minutesConverted = hours * 60;
    let totalMinutes = minutes + minutesConverted;
    let ratio = totalMinutes / 1440;
    let percentage = ratio * 100;
    return Math.round(percentage * 1000) / 1000;
  }
});
