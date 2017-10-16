import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import Component from '@ember/component';
import Ember from 'ember';
import layout from '../templates/components/calendar-event';
import moment from 'moment';

export default Component.extend({
  layout: layout,
  event: null,
  classNames: ['event', 'event-pos'],
  attributeBindings: ['style'],

  style: computed(function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return htmlSafe(
      `top: ${escape(this.calculateTop())}%;
       height: ${escape(this.calculateHeight())}%;
       left: ${escape(this.calculateLeft())}%;
       width: ${escape(this.calculateWidth())}%;`
    );
  }),

  calculateLeft() {
    let percentageSlice = 100 / this.event.cluster.totalLevels;
    let leftPercentage = this.event.level * percentageSlice;
    return Math.round(leftPercentage * 10000) / 10000;
  },

  calculateWidth() {
    let percentageSlice = 100 / this.event.cluster.totalLevels;
    return Math.round(percentageSlice * 10000) / 10000;
  },

  calculateTop() {
    return this._calculatePercentageFromTop(this.event.startDate);
  },

  calculateHeight() {
    let percentageDistanceFromTop = this._calculatePercentageFromTop(this.event.endDate);
    let height = percentageDistanceFromTop - this.calculateTop();
    return Math.round(height * 10000) / 10000;
  },

  _calculatePercentageFromTop(date) {
    let momentDate = moment(date);
    let hours = momentDate.hours();
    let minutes = momentDate.minutes();
    let minutesConverted = hours * 60;
    let totalMinutes = minutes + minutesConverted;
    let ratio = totalMinutes / 1440;
    let percentage = ratio * 100;
    return Math.round(percentage * 10000) / 10000;
  }
});
