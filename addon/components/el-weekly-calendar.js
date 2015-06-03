import Ember from 'ember';
import layout from '../templates/components/el-weekly-calendar';
import Week from 'el-calendar/models/week';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  date: null,
  events: null,

  week: Ember.computed('date', 'events', function() {
    return Week.create({ date: this.date, events: this.events });
  })
});
