import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return new Ember.RSVP.Promise(function(resolve) {
      resolve({
        date: params.month_date,
        events: Ember.A([
          { name: 'Meeting with Joe', startDate: '2015-06-25T14:30', endDate: '2015-06-27T15:30' },
          { name: 'Coffee with Susan', startDate: '2015-06-27T16:00', endDate: '2015-06-27T16:30' },
          { name: 'Breakfast with Geico', startDate: '2015-06-28T08:30', endDate: '2015-06-28T09:30' },
          { name: 'Taxes due', startDate: '2015-06-12T00:00', endDate: '2015-06-12T01:00' }
        ])
      });
    });
  }
});
