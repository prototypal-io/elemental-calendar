import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  todaysDate: Ember.computed(function() {
    return moment(new Date()).format('YYYY-MM-DD');
  })
});
