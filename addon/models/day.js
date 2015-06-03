import Ember from 'ember';
import moment from 'moment';
import Month from 'el-calendar/models/month';
import Week from 'el-calendar/models/week';
import Hour from 'el-calendar/models/hour';

let Day = Ember.Object.extend({
  events: null,
  date: null,
  eventList: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date);
  }),

  formattedDate: Ember.computed('_momentDate', function() {
    return this.get('_momentDate').format('YYYY-MM-DD');
  }),

  dayName: Ember.computed('_momentDate', function() {
    let weekday = this.get('_momentDate').day();
    return moment().weekday(weekday).format('dddd');
  }),

  hours: Ember.computed('_momentDate', function() {
    let hours = Ember.A();
    let startOfDayMoment = moment(this.get('_momentDate')).startOf('day');

    for (let i = 0; i < 24; i++) {
      let datetime = moment(startOfDayMoment).toDate();
      let hour = Hour.create({ datetime: datetime, eventList: this.eventList });
      startOfDayMoment.add(1, 'hours');
      hours.pushObject(hour);
    }
    return hours;
  }),

  init() {
    this._super(...arguments);
    this.events = this.eventList.forDay(this);
  },

  week(events) {
    return Week.create({ date: this.date, events: events });
  },

  month(events) {
    return Month.create({ date: this.date, events: events });
  }
});

export default Day;
