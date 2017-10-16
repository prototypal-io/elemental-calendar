import { A } from '@ember/array';
import { Promise as EmberPromise } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return new EmberPromise(function(resolve) {
      resolve({
        date: params.week_date,
        events: A([
          { name: 'Meeting with Joe', startDate: '2015-06-24T16:30', endDate: '2015-06-24T22:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-24T17:00', endDate: '2015-06-24T18:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-24T17:00', endDate: '2015-06-24T18:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-24T22:00', endDate: '2015-06-24T23:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-24T22:00', endDate: '2015-06-24T24:00' },
          { name: 'Meeting with Joe', startDate: '2015-06-25T14:30', endDate: '2015-06-27T15:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-27T12:00', endDate: '2015-06-27T16:30' },
          { name: 'Coffee with Johnny', startDate: '2015-06-27T12:00', endDate: '2015-06-27T18:30' },
          { name: 'Coffee with Timmy', startDate: '2015-06-27T12:00', endDate: '2015-06-27T16:30' },
          { name: 'Breakfast with Geico', startDate: '2015-06-27T21:30', endDate: '2015-06-27T22:30' },
          { name: 'Breakfast with Geico', startDate: '2015-06-28T08:30', endDate: '2015-06-28T09:30' },
          { name: 'Taxes due', startDate: '2015-06-12T00:00', endDate: '2015-06-12T01:00' }
        ])
      });
    });
  }
});
