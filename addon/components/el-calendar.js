import Ember from 'ember';
import layout from '../templates/components/el-calendar';
import Month from '../models/month';
import Week from '../models/week';

export default Ember.Component.extend({
  layout: layout,
  type: 'monthly',
  date: null,
  events: null,

  weeks: Ember.computed('date', function() {
    if (this.date) {
      return Month.create({date: this.date, events: this.events}).get('weeks');
    }
  }),

  week: Ember.computed('date', function() {
    if (this.date) {
      return Week.create({date: this.date, events: this.events});
    }
  }),

  monthly: Ember.computed('type', function() {
    return this.get('type') === 'monthly';
  }),

  weekly: Ember.computed('type', function() {
    return this.get('type') === 'weekly';
  })
});
