import Ember from 'ember';
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

  previous() {
    let previousWeek = moment(this.get('_momentDate')).subtract(1, 'weeks');
    return Week.create({ date: previousWeek.format('YYYY-MM-DD') });
  },

  next() {
    let nextWeek = moment(this.get('_momentDate')).add(1, 'weeks');
    return Week.create({ date: nextWeek.format('YYYY-MM-DD') });
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
