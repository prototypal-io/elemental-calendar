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

  buildClusteredEventsForDay(day) {
    let dateKey = day.get('dateKey'); // YYYY-MM-DD
    let dayEvents = this.get(`dayLookup.${dateKey}`) || Ember.A([]);
    let clusters = [];

    if (dayEvents.length !== 0) {
      clusters.push({});
    }

    dayEvents.forEach(dayEvent => {
      // check that the day event in question does not conflict with ANY cluster
      let allClear = this._determineClusterAllClear(clusters, dayEvent);

      if (allClear) {
        let newCluster = {
          startDate: dayEvent.startDate,
          endDate: dayEvent.endDate,
          events: [dayEvent]
        };
        dayEvent.cluster = newCluster;
        clusters.push(newCluster);
      }
    });

    this.buildLevelsForClusters(clusters);

    return dayEvents;
  },

  _determineClusterAllClear(clusters, event) {
    return clusters.every(cluster => {
      let eventStart = moment(event.startDate);
      let eventEnd = moment(event.endDate);
      let clusterStart = moment(cluster.startDate);
      let clusterEnd = moment(cluster.endDate);

      if (!cluster.startDate) {
        cluster.startDate = event.startDate;
        cluster.endDate = event.endDate;
        cluster.events = [event];
        event.cluster = cluster;
        return false;
      } else if ((eventStart > clusterStart && eventStart < clusterEnd) ||
                 (eventEnd < clusterEnd && eventEnd > clusterStart) ||
                 (eventEnd > clusterEnd && eventStart < clusterStart)) {
        // cluster range collision!

        // if the day event's start is less than the cluster range's start
        // expand the cluster range's start bounds — if the day event's end is
        // greater than the cluster range's end, expand the cluster range's end bound
        if (eventStart < clusterStart) {
          cluster.startDate = event.startDate;
        }

        if (eventEnd > clusterEnd) {
          cluster.endDate = event.endDate;
        }

        event.cluster = cluster;
        cluster.events.push(event);
        return false;
      } else {
        // no collision!
        return true;
      }
    });
  },

  buildLevelsForClusters(clusters) {
    clusters.forEach(cluster => {
      let clusterLevels = [];

      cluster.events.forEach(event => {
        if (clusterLevels.length === 0) {
          event.level = 0;
          clusterLevels.push([event]);
        } else {
          for (let level = 0; level < clusterLevels.length; level++) {
            let clusterLevel = clusterLevels[level];

            // check that the event in question does not conflict with ANY cluster event
            let allClear = this._determineLevelAllClear(clusterLevel, event);

            // if there are no conflicts, set event's level, push event into this level, and break!
            if (allClear) {
              event.level = level;
              clusterLevel.push(event);
              break;
            } else if (!clusterLevels[level+1]) {
              // otherwise if there are conflicts, check if the next level exists — if not, make it and break
              event.level = level + 1;
              clusterLevels[level+1] = [event];
              break;
            }
          }
        }
      });

      cluster.totalLevels = clusterLevels.length;
    });

    return clusters;
  },

  _determineLevelAllClear(clusterLevel, event) {
    return clusterLevel.every(levelEvent => {
      // debugger;
      let eventStart = moment(event.startDate);
      let eventEnd = moment(event.endDate);
      let levelEventStart = moment(levelEvent.startDate);
      let levelEventEnd = moment(levelEvent.endDate);

      if (!((eventStart >= levelEventStart && eventStart < levelEventEnd) ||
          (eventEnd <= levelEventEnd && eventEnd > levelEventStart) ||
          (eventStart < levelEventStart && eventEnd > levelEventEnd))) {
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

  clusteredEventsForDay(day) {
    return this.buildClusteredEventsForDay(day);
  },

  _addLookupEntry(lookup, timeKey, event) {
    if (lookup[timeKey]) {
      lookup[timeKey].push(event);
    } else {
      lookup[timeKey] = Ember.A([event]);
    }
  }
});
