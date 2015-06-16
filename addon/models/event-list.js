import Ember from 'ember';
import moment from 'moment';

export default Ember.Object.extend({
  events: null,

  dayLookup: Ember.computed('events', function() {
    let lookup = {};
    let events = this.get('events');
    if (events) {
      events.forEach(event => {
        let startDate = moment(event.startDate);
        let endDate = moment(event.endDate);
        let startDateKey = startDate.format('YYYY-MM-DD');
        let endDateKey = endDate.format('YYYY-MM-DD');
        let isMultiDayEvent = startDateKey !== endDateKey;

        do {
          let bucketedEvent = event;
          let isEnd = false;
          if (startDateKey === endDateKey) { isEnd = true; }
          if (isMultiDayEvent) {
            bucketedEvent = this._createContinuationEvent(event, startDate.format(), isEnd ? event.endDate : startDate.endOf('day').format());
          }
          this._addLookupEntry(lookup, startDateKey, bucketedEvent);

          startDate = startDate.add(1, 'days').startOf('day');
          startDateKey = startDate.format('YYYY-MM-DD');
        } while (startDate <= endDate);
      });
    }
    return lookup;
  }),

  getLeveledEventsForDay(day) {
    let dateKey = day.get('dateKey');
    let dayEvents = this.get(`dayLookup.${dateKey}`) || Ember.A([]);
    let dayLevels = [];

    dayEvents.forEach(dayEvent => {
      if (dayLevels.length === 0) {
        dayEvent.level = 0;
        dayLevels.push([dayEvent]);
      } else {
        for (let level = 0; level < dayLevels.length; level++) {
          let dayLevel = dayLevels[level];

          // check that every event in this level does not conflict with the day event in question
          let allClear = this._determineLevelAllClear(dayLevel, dayEvent);

          // if there are no conflicts, set event's level, push event into this level, and break!
          if (allClear) {
            dayEvent.level = level;
            dayLevel.push(dayEvent);
            break;
          } else if (!dayLevels[level+1]) {
            // otherwise if there are conflicts, check if the next level exists — if not, make it and break
            dayEvent.level = level + 1;
            dayLevels[level+1] = [dayEvent];
            break;
          }
        }
      }
    });

    dayEvents.forEach(event => {
      event.totalLevels = dayLevels.length;
    });

    return dayEvents;
  },

  _determineLevelAllClear(dayLevel, dayEvent) {
    return dayLevel.every(levelEvent => {
      let dayEventStart = moment(dayEvent.startDate);
      let dayEventEnd = moment(dayEvent.endDate);
      let levelEventStart = moment(levelEvent.startDate);
      let levelEventEnd = moment(levelEvent.endDate);

      if (!((dayEventStart > levelEventStart && dayEventStart < levelEventEnd) ||
          (dayEventEnd < levelEventEnd && dayEventEnd > levelEventStart))) {
        return true;
      }
    });
  },

  _cloneEvent(event) {
    return Ember.merge({}, event);
  },

  _createContinuationEvent(event, startDate, endDate) {
    let continuationEvent = this._cloneEvent(event);
    continuationEvent.startDate = startDate;
    continuationEvent.endDate = endDate;
    return continuationEvent;
  },


  hourLookup: Ember.computed('events', function() {
    let lookup = {};
    if (this.get('events')) {
      this.get('events').forEach(event => {
        let datetimeKey = moment(event.startDate).format('YYYY-MM-DD H');
        this._addLookupEntry(lookup, datetimeKey, event);
      });
    }
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

  leveledEventsForDay(day) {
    return this.getLeveledEventsForDay(day);
  },

  _addLookupEntry(lookup, timeKey, event) {
    if (lookup[timeKey]) {
      lookup[timeKey].push(event);
    } else {
      lookup[timeKey] = Ember.A([event]);
    }
  }
});
