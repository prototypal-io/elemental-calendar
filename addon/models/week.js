import Ember from 'ember';
import moment from 'moment';
import Month from 'el-calendar/models/month';
import Day from 'el-calendar/models/day';
import EventList from 'el-calendar/models/event-list';

let Week = Ember.Object.extend({
  date: null,
  events: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  days: Ember.computed('_momentDate', function() {
    let days = Ember.A();
    let startOfWeekMoment = moment(this.get('_momentDate')).startOf('week');
    let eventList = EventList.create({ events: this.events });

    for (let i = 0; i < 7; i++) {
      let date = startOfWeekMoment.format('YYYY-MM-DD');
      let day = Day.create({ date: date });
      day.set('events', eventList.forDay(day));
      startOfWeekMoment.add(1, 'days');
      days.pushObject(day);
    }
    return days;
  }),

  previous(events) {
    let previousWeek = moment(this.get('_momentDate')).subtract(1, 'weeks');
    return Week.create({ date: previousWeek.format('YYYY-MM-DD'), events: events });
  },

  next(events) {
    let nextWeek = moment(this.get('_momentDate')).add(1, 'weeks');
    return Week.create({ date: nextWeek.format('YYYY-MM-DD'), events: events });
  },

  month(events) {
    return Month.create({ date: this.date, events: events });
  }
});

export default Week;
