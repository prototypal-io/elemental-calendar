import Ember from 'ember';
import moment from 'moment';
import Week from 'el-calendar/models/week';

let Month = Ember.Object.extend({
  date: null,
  events: null,
  _numberOfDaysInPreviousMonth: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date, 'YYYY-MM-DD');
  }),

  weeks: Ember.computed('_momentDate', function() {
    let momentDate = this.get('_momentDate');
    // http://momentjs.com/docs/#/displaying/days-in-month/
    let numberOfDaysInMonth = momentDate.daysInMonth();
    // Set new moment date to first day of the month
    let dayOfMonthMoment = moment(momentDate).startOf('month');
    let weeks = Ember.A();

    let firstWeekDate = dayOfMonthMoment.format('YYYY-MM-DD');
    let firstWeek = Week.create({ date: firstWeekDate, events: this.events });
    weeks.pushObject(firstWeek);
    for (let i = 7; i < numberOfDaysInMonth; i += 7) {
      let nextWeek = weeks.get('lastObject').next(this.events);
      weeks.pushObject(nextWeek);
    }
    return weeks;
  })
});

export default Month;
