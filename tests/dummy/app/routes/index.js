import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  beforeModel() {
    this.replaceWith('monthly', this._todaysDate());
  },

  _todaysDate: function() {
    return moment(new Date()).format('YYYY-MM-DD');
  }
});
