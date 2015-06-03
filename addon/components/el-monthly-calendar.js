import Ember from 'ember';
import Month from 'el-calendar/models/month';
import layout from '../templates/components/el-monthly-calendar';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',
  
  date: null,
  events: null,

  month: Ember.computed('date', 'events', function() {
    return Month.create({ date: this.date, events: this.events });
  })
});
