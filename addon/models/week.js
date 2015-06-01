import Ember from 'ember';
import moment from 'moment';
import Month from 'el-calendar/models/month';
import Day from 'el-calendar/models/day';

let Week = Ember.Object.extend({
  days: null,
  events: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  init() {
    this._super(...arguments);
    this.days = this.days || Ember.A();
    this.events = this.events || Ember.A();

    if (this.date) {
      let startOfWeekMoment = moment(this.get('_momentDate')).startOf('week');
      for (let i = 0; i < 7; i++) {
        let date = startOfWeekMoment.format('YYYY-MM-DD');
        let collectedEvents = this._collectEvents(this.events, date);
        let day = Day.create({ date: date, events: collectedEvents });
        day.dayName = moment().weekday(startOfWeekMoment.day()).format('dddd');
        this.days.pushObject(day);
        startOfWeekMoment.add(1, 'days');
      }
    }
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
