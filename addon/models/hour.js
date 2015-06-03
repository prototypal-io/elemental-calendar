import Ember from 'ember';
import moment from 'moment';

export default Ember.Object.extend({
  events: null,
  datetime: null,

  _momentDateTime: Ember.computed('datetime', function() {
    return moment(this.datetime, 'YYYY-MM-DD h:mm a');
  }),

  formattedHour: Ember.computed('datetime', function() {
    return this.get('_momentDateTime').format('h:mm a');
  })
});
