import Ember from 'ember';
import moment from 'moment';
import Hour from 'el-calendar/models/hour';

let Day = Ember.Object.extend({
  events: null,
  date: null,
  eventList: null,
  dateKey: Ember.computed.alias('formattedDate'),

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
    let momentDate = this.get('_momentDate').clone();

    for (let i = 0; i < 24; i++) {
      momentDate.hour(i);
      let datetime = momentDate.toDate();
      let hour = Hour.create({ datetime: datetime, eventList: this.eventList });
      hours.pushObject(hour);
    }
    return hours;
  }),

  init() {
    this._super(...arguments);
    this.events = this.eventList.clusteredEventsForDay(this);
  }
});

export default Day;
