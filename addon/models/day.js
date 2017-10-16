import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import moment from 'moment';
import Hour from 'el-calendar/models/hour';

let Day = EmberObject.extend({
  events: null,
  date: null,
  eventList: null,
  dateKey: alias('formattedDate'),

  _momentDate: computed('date', function() {
    return moment(this.date);
  }),

  formattedDate: computed('_momentDate', function() {
    return this.get('_momentDate').format('YYYY-MM-DD');
  }),

  dayName: computed('_momentDate', function() {
    let weekday = this.get('_momentDate').day();
    return moment().weekday(weekday).format('dddd');
  }),

  hours: computed('_momentDate', function() {
    let hours = A();
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
