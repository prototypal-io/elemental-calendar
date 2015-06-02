import Ember from 'ember';
import moment from 'moment';
import Week from 'el-calendar/models/week';

let Month = Ember.Object.extend({
  date: null,
  events: null,
  days: null,
  _numberOfDaysInPreviousMonth: null,

  weeks: Ember.computed('date', function() {
    let momentDate = this._momentDate();
    // http://momentjs.com/docs/#/displaying/days-in-month/
    let numberOfDaysInMonth = momentDate.daysInMonth();
    // Set new moment date to first day of the month
    let dayOfMonthMoment = moment(momentDate).startOf('month');
    let weeks = Ember.A();

    this._daysFromLastMonthSetup();
    this.days = Ember.A();

    // we're going to be handling events as an EventList Object nao
    let firstWeekDate = dayOfMonthMoment.format('YYYY-MM-DD');
    let firstWeek = Week.create({ date: firstWeekDate, events: this.events });
    weeks.pushObject(firstWeek);
    for (let i = 7; i < numberOfDaysInMonth; i += 7) {
      let nextWeek = weeks.get('lastObject').next(this.events);
      weeks.pushObject(nextWeek);
    }
    return weeks;
  }),

  previous(events) {
    return Month.create({ date:  this._previousMonthMoment(), events: events });
  },

  next(events) {
    return Month.create({ date: this._nextMonthMoment(), events: events });
  },

  _momentDate() {
    return moment(this.date, 'YYYY-MM-DD');
  },

  _previousMonthMoment() {
    return moment(this._momentDate()).subtract(1, 'months');
  },

  _nextMonthMoment() {
    return moment(this._momentDate()).add(1, 'months');
  },

  _daysFromLastMonthSetup() {
    // this private var can get modified - it's not reliable
    this._numberOfDaysInPreviousMonth = this._previousMonthMoment().daysInMonth();
  },

  _collectEvents(events, date) {
    if (!events || Ember.isEmpty(events)) { return Ember.A(); }
    let collectedEvents = Ember.A(events.filter(event => {
      return moment(event.date).format('YYYY-MM-DD') === date;
    }));
    return collectedEvents;
  }
});

export default Month;
