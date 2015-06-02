import Ember from 'ember';
import Month from 'el-calendar/models/month';
import layout from '../templates/components/el-monthly-calendar';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  weeks: Ember.computed('date', function() {
    if (this.date) {
      return Month.create({date: this.date, events: this.events}).get('weeks');
    }
  })
});
