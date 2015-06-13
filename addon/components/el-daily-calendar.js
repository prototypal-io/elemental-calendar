import Ember from 'ember';
import layout from '../templates/components/el-daily-calendar';
import EventList from 'el-calendar/models/event-list';
import Day from 'el-calendar/models/day';

export default Ember.Component.extend({
  layout: layout,
  date: null,
  events: null,
  classNames: ['el-calendar'],

  day: Ember.computed('date', 'events.[]', function() {
    let eventList = EventList.create({ events: this.events });
    return Day.create({ date: this.date, eventList: eventList });
  })
});
