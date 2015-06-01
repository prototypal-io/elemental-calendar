import Ember from 'ember';
import Week from 'el-calendar/models/week';
import Day from 'el-calendar/models/day';

let Month = Ember.Object.extend({
  date: null,
  events: null,
  days: null,
  weeks: null,
  _numberOfDaysInPreviousMonth: null,
  _previousMonthDateArray: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  _previousMonthMoment: Ember.computed('_momentDate', function() {
    return moment(this.get('_momentDate')).subtract(1, 'months');
  }),

  _nextMonthMoment: Ember.computed('_momentDate', function() {
    return moment(this.get('_momentDate')).add(1, 'months');
  }),

  init() {
    let momentDate = this.get('_momentDate');

    // http://momentjs.com/docs/#/displaying/days-in-month/
    let numberOfDaysInMonth = momentDate.daysInMonth();

    // Set new moment date to first day of the month
    let firstDayOfMonthMoment = moment(momentDate).startOf('month');

    // firstWeekdayOfMonth is an integer between 0-6 that represents a day of the week
    let firstWeekdayOfMonth = moment(firstDayOfMonthMoment).day();

    let weeks = this.weeks = Ember.A();
    let currentDay = firstWeekdayOfMonth;
    let dayOfMonth = 1;

    this._super(...arguments);
    this._daysFromLastMonthSetup();
    this.days = Ember.A();

    for (let i = 0; i < numberOfDaysInMonth; i++) {
      // If weeks is empty, add the first week and unshift the days from last month
      if (Ember.isEmpty(weeks)) {
        weeks.pushObject(Week.create());
        this._handleDaysFromLastMonth(firstWeekdayOfMonth);
      }

      // If currentDay is past the number of days in a week, add a new week
      if (currentDay === 7) {
        weeks.pushObject(Week.create());
        currentDay = 0;
      }

      // If currentDay is less than the number of days in a week, push a day in
      if (currentDay < 7) {
        this._handleDayInCurrentMonth(currentDay, dayOfMonth);
        currentDay++;
        dayOfMonth++;
      }
    }
  },

  previous(events) {
    return Month.create({ date:  this.get('_previousMonthMoment'), events: events });
  },

  next(events) {
    return Month.create({ date: this.get('_nextMonthMoment'), events: events });
  },

  _daysFromLastMonthSetup() {
    // this private var can get modified - it's not reliable
    this._numberOfDaysInPreviousMonth = this.get('_previousMonthMoment').daysInMonth();
  },

  _handleDaysFromLastMonth(firstWeekdayOfMonth) {
    for (let i = 0; i < firstWeekdayOfMonth; i++) {
      let day = Day.create();
      let dayName = moment().weekday(firstWeekdayOfMonth - (i + 1)).format('dddd');
      let previousMonthDateArray = this.get('_previousMonthMoment').toArray();
      previousMonthDateArray[2] = this._numberOfDaysInPreviousMonth;
      day.set('dayName', dayName);
      day.set('date', moment(previousMonthDateArray).format('YYYY-MM-DD'));
      this.weeks.get('lastObject.days').unshift(day);
      this._numberOfDaysInPreviousMonth--;
    }
  },

  _handleDayInCurrentMonth(currentDay, dayOfMonth) {
    let day = Day.create();
    let dayName = moment().weekday(currentDay).format('dddd');
    let dateArray = this.get('_momentDate').toArray();
    dateArray[2] = dayOfMonth;
    let date = moment(dateArray).format('YYYY-MM-DD');
    let collectedEvents = this._collectEvents(this.events, date);
    day.set('dayName', dayName);
    day.set('date', date);
    day.get('events').pushObjects(collectedEvents);

    this.weeks.get('lastObject.days').push(day);
    this.days.pushObject(day);
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
