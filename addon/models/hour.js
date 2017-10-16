import EmberObject, { computed } from '@ember/object';
import moment from 'moment';

export default EmberObject.extend({
  events: null,
  datetime: null,

  _momentDateTime: computed('datetime', function() {
    return moment(this.datetime);
  }),

  formattedHour: computed('datetime', function() {
    return this.get('_momentDateTime').format('h:mm a');
  }),

  init() {
    this._super(...arguments);
    this.events = this.eventList.forHour(this);
  }
});
