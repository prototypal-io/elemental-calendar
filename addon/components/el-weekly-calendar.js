import Ember from 'ember';
import layout from '../templates/components/el-weekly-calendar';
import Week from 'el-calendar/models/week';
import EventList from 'el-calendar/models/event-list';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',
  date: null,
  events: null,

  week: Ember.computed('date', 'events', function() {
    let eventList = EventList.create({ events: this.events });
    return Week.create({ date: this.date, eventList: eventList });
  })
});
