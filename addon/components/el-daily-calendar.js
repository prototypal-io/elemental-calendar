import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/el-daily-calendar';
import EventList from 'elemental-calendar/models/event-list';
import Day from 'elemental-calendar/models/day';

export default Component.extend({
  layout: layout,
  date: null,
  events: null,
  classNames: ['el-calendar'],

  day: computed('date', 'events.[]', function() {
    let eventList = EventList.create({ events: this.events });
    return Day.create({ date: this.date, eventList: eventList });
  })
});
