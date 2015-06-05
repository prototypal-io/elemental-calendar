import Ember from 'ember';

export default Ember.Controller.extend({
  date: '2015-06-24',

  events: Ember.A([
    { name: 'Meeting with Joe', date: 'June 25, 2015, 2:30 pm', endDate: 'June 25, 2015, 3:30 pm' },
    { name: 'Coffee with Susan', date: 'June 27, 2015, 4:00 pm', endDate: 'June 27, 2015, 4:30 pm' },
    { name: 'Breakfast with Geico', date: 'June 28, 2015, 8:30 am', endDate: 'June 28, 2015, 9:30 am'},
    { name: 'Taxes due', date: 'June 12, 2015, 12:00 am' }
  ])
});
