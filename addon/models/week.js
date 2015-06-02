import Ember from 'ember';
import moment from 'moment';
import Month from 'el-calendar/models/month';
import Day from 'el-calendar/models/day';
import EventList from 'el-calendar/models/event-list';

let Week = Ember.Object.extend({
  events: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  days: Ember.computed('date', function() {
    if (this.date) {
      let days = Ember.A();
      let startOfWeekMoment = moment(this.get('_momentDate')).startOf('week');
      for (let i = 0; i < 7; i++) {
        let date = startOfWeekMoment.format('YYYY-MM-DD');
        // let collectedEvents = this._collectEvents(this.events, date);
        let eventList = EventList.create({ events: this.events });
        let day = Day.create({ date: date });
        day.set('events', eventList.forDay(day));

        // day.set('events', EventList.forDay(day));
        days.pushObject(day);
      }
      return days;
    }
  }),

  init() {
    this._super(...arguments);
    this.events = this.events || Ember.A();
  },

  previous(events) {
    let previousWeek = moment(this.get('_momentDate')).subtract(1, 'weeks');
    return Week.create({ date: previousWeek.format('YYYY-MM-DD'), events: events });
  },

  next(events) {
    let nextWeek = moment(this.get('_momentDate')).add(1, 'weeks');
    return Week.create({ date: nextWeek.format('YYYY-MM-DD'), events: events });
  },

  month(events) {
    // we probably want to set @month to the month instance if this week was created
    // by the Month class — otherwise, just create a new month instance
    if (this.date) {
      return Month.create({ date: this.date, events: events });
    }
  },

  _collectEvents(events, date) {
    if (!events || Ember.isEmpty(events)) { return Ember.A(); }
    let collectedEvents = Ember.A(events.filter(event => {
      return moment(event.date).format('YYYY-MM-DD') === date;
    }));
    return collectedEvents;
  }
});

export default Week;
