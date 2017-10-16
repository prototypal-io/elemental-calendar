import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  todaysDate: computed(function() {
    return moment(new Date()).format('YYYY-MM-DD');
  })
});
