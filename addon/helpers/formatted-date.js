import Ember from 'ember';
import moment from 'moment';

export function formattedDate(params, hash = {}) {
  let output;
  if (hash.type === 'weekly-header') {
    output = moment(params[0]).format('ddd M/D');
  }
  return output;
}

export default Ember.HTMLBars.makeBoundHelper(formattedDate);
