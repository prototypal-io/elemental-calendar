import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import moment from 'moment';
import Month from 'elemental-calendar/models/month';
import Day from 'elemental-calendar/models/day';
import EventList from 'elemental-calendar/models/event-list';

let Week = EmberObject.extend({
  date: null,
  events: null,
  eventList: null,

  _momentDate: computed('date', function() {
    return moment(this.date);
  }),

  _startOfWeekMoment: computed('_momentDate', function(){
    return moment(this.get('_momentDate')).startOf('week');
  }),

  days: computed('_momentDate', function() {
    let days = A();
    let startOfWeekMoment = this.get('_startOfWeekMoment');

    for (let i = 0; i < 7; i++) {
      let date = moment(startOfWeekMoment).toDate();
      let day = Day.create({ date: date, eventList: this.eventList });
      startOfWeekMoment.add(1, 'days');
      days.pushObject(day);
    }
    return days;
  }),

  startOfWeekMonthNumber: computed('_momentDate', function() {
    let startOfWeekMoment = this.get('_startOfWeekMoment');
    return startOfWeekMoment.format('M');
  }),

  init() {
    this._super(...arguments);
    this.eventList = this.eventList || EventList.create({ events: this.events });
  },

  previous() {
    let previousWeek = moment(this.get('_momentDate')).subtract(1, 'weeks');
    return Week.create({ date: previousWeek.toDate(), eventList: this.eventList });
  },

  next() {
    let nextWeek = moment(this.get('_momentDate')).add(1, 'weeks');
    return Week.create({ date: nextWeek.toDate(), eventList: this.eventList });
  },

  month(events) {
    return Month.create({ date: this.date, events: events });
  }
});

export default Week;
