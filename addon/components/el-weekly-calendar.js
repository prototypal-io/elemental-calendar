import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/el-weekly-calendar';
import Week from 'el-calendar/models/week';
import EventList from 'el-calendar/models/event-list';

export default Component.extend({
  layout: layout,
  classNames: ['el-calendar'],
  date: null,
  events: null,

  week: computed('date', 'events.[]', function() {
    let eventList = EventList.create({ events: this.events });
    return Week.create({ date: this.date, eventList: eventList });
  })
});
