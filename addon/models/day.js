import Ember from 'ember';
import moment from 'moment';
import Month from 'el-calendar/models/month';
import Week from 'el-calendar/models/week';
import EventList from 'el-calendar/models/event-list';
import Hour from 'el-calendar/models/hour';

let Day = Ember.Object.extend({
  events: null,
  date: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  dayName: Ember.computed('_momentDate', function() {
    let weekday = this.get('_momentDate').day();
    return moment().weekday(weekday).format('dddd');
  }),

  hours: Ember.computed('_momentDate', function() {
    let hours = Ember.A();
    let startOfDayMoment = moment(this.get('_momentDate')).startOf('day');
    let eventList = EventList.create({ events: this.events });

    for (let i = 0; i < 24; i++) {
      let datetime = startOfDayMoment.format('YYYY-MM-DD h:mm a');
      let hour = Hour.create({ datetime: datetime });
      hour.set('events', eventList.forHour(hour));
      startOfDayMoment.add(1, 'hours');
      hours.pushObject(hour);
    }
    return hours;
  }),

  week(events) {
    return Week.create({ date: this.date, events: events });
  },

  month(events) {
    return Month.create({ date: this.date, events: events });
  }
});

export default Day;
