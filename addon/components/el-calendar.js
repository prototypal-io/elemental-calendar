import Ember from 'ember';
import layout from '../templates/components/el-calendar';
import Month from '../models/month';

export default Ember.Component.extend({
  layout: layout,
  type: 'monthly',
  date: null,
  events: Ember.A(
    [{ name: 'Meeting with Joe', date: 'June 25, 2015, 2:30 pm' },
     { name: 'Coffee with Susan', date: 'June 27, 2015, 4:00 pm' },
     { name: 'Breakfast with Geico', date: 'June 28, 2015, 8:30 am'},
     { name: 'Taxes due', date: 'June 12, 2015, 12:00 am'}]
  ),

  init() {
    this._super(...arguments);
  },

  numberOfDays: Ember.computed('date', function() {
    this._moment = moment(this.date, 'YYYY-MM-DD');
    return this._moment.daysInMonth();
  }),

  weeks: Ember.computed('date', function() {
    return Month.weeks(this.date, this.events);
  }),

  monthly: Ember.computed('type', function() {
    return this.get('type') === 'monthly';
  })
});
