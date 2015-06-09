import Ember from 'ember';
import moment from 'moment';

export function formattedDate(params, hash = {}) {
  let output;
  let momentDate = moment(params[0]);
  if (hash.type === 'weekly-header') {
    output = momentDate.format('ddd M/D');
  } else if (hash.type === 'monthly-day') {
    output = momentDate.format('D');
  } else if (hash.type === 'daily-header') {
    output = momentDate.format('dddd M/D');
  } else if (hash.type === 'day-of-week') {
    output = momentDate.format('dddd');
  }
  return output;
}

export default Ember.HTMLBars.makeBoundHelper(formattedDate);
