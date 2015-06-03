import Ember from 'ember';
import moment from 'moment';

export default Ember.Object.extend({
  events: null,

  dayLookup: Ember.computed('events', function() {
    let lookup = {};
    this.get('events').forEach(event => {
      let dateKey = moment(event.date).format('YYYY-MM-DD');
      this._addLookupEntry(lookup, dateKey, event);
    });
    return lookup;
  }),

  hourLookup: Ember.computed('events', function() {
    let lookup = {};

    this.get('events').forEach(event => {
      let datetimeKey = moment(event.date).format('YYYY-MM-DD H');
      this._addLookupEntry(lookup, datetimeKey, event);
    });
    return lookup;
  }),

  forHour(hour) {
    let datetimeKey = moment(hour.get('datetime')).format('YYYY-MM-DD H');
    return this.get(`hourLookup.${datetimeKey}`) || Ember.A();
  },

  forDay(day) {
    let dateKey = moment(day.get('date')).format('YYYY-MM-DD');
    return this.get(`dayLookup.${dateKey}`) || Ember.A();
  },

  _addLookupEntry(lookup, timeKey, event) {
    if (lookup[timeKey]) {
      lookup[timeKey].push(event);
    } else {
      lookup[timeKey] = Ember.A([event]);
    }
  }
});
