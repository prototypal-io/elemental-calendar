import Ember from 'ember';

export default Ember.Controller.extend({
  events: Ember.A([
    { name: 'Meeting with Joe', date: 'June 25, 2015, 2:30 pm' },
    { name: 'Coffee with Susan', date: 'June 27, 2015, 4:00 pm' },
    { name: 'Breakfast with Geico', date: 'June 28, 2015, 8:30 am'},
    { name: 'Taxes due', date: 'June 12, 2015, 12:00 am'}
  ])
});
