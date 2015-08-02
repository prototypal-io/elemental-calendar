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
    // Set new moment date to first day of the month
    let dayOfMonthMoment = moment(momentDate).startOf('month');
    let monthNumber = dayOfMonthMoment.format('M');
    let weeks = Ember.A();

    let firstWeekDate = dayOfMonthMoment.toDate();
    let nextWeek = Week.create({ date: firstWeekDate, eventList: this.eventList });
    do {
      weeks.pushObject(nextWeek);
      nextWeek = weeks.get('lastObject').next(this.eventList);
    } while(nextWeek.get('startOfWeekMonthNumber') === monthNumber);

    return weeks;
  }),

  init() {
    this._super(...arguments);
    this.eventList = this.eventList || EventList.create({ events: this.events });
  }
});

export default Month;
