import { computed } from '@ember/object';
import Component from '@ember/component';
import Month from 'el-calendar/models/month';
import layout from '../templates/components/el-monthly-calendar';
import EventList from 'el-calendar/models/event-list';

export default Component.extend({
  layout: layout,
  date: null,
  events: null,
  classNames: ['el-calendar'],

  month: computed('date', 'events.[]', function() {
    let eventList = EventList.create({ events: this.events });
    return Month.create({ date: this.date, eventList: eventList });
  })
});
