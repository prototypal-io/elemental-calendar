import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  beforeModel() {
    this.replaceWith('monthly', this._todaysDate());
  },

  _todaysDate: function() {
    return moment(new Date()).format('YYYY-MM-DD');
  }
});
