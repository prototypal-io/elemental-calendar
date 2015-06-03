import Ember from 'ember';
import moment from 'moment';
import Week from 'el-calendar/models/week';
import EventList from 'el-calendar/models/event-list';

let Month = Ember.Object.extend({
  date: null,
  events: null,
  eventList: null,
  _numberOfDaysInPreviousMonth: null,

  _momentDate: Ember.computed('date', function() {
    return moment(this.date);
  }),

  weeks: Ember.computed('_momentDate', function() {
    let momentDate = this.get('_momentDate');
    // http://momentjs.com/docs/#/displaying/days-in-month/
    let numberOfDaysInMonth = momentDate.daysInMonth();
    // Set new moment date to first day of the month
    let dayOfMonthMoment = moment(momentDate).startOf('month');
    let weeks = Ember.A();

    let firstWeekDate = dayOfMonthMoment.toDate();
    let firstWeek = Week.create({ date: firstWeekDate, eventList: this.eventList });
    weeks.pushObject(firstWeek);
    for (let i = 7; i < numberOfDaysInMonth; i += 7) {
      let nextWeek = weeks.get('lastObject').next(this.eventList);
      weeks.pushObject(nextWeek);
    }
    return weeks;
  }),

  init() {
    this._super(...arguments);
    this.eventList = this.eventList || EventList.create({ events: this.events });
  }
});

export default Month;
