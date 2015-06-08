import Ember from 'ember';

export default Ember.Controller.extend({
  date: "2015-06-24",

  events: Ember.A([
    { name: 'Meeting with Joe', startDate: 'June 25, 2015, 2:30 pm' },
    { name: 'Coffee with Susan', startDate: 'June 27, 2015, 4:00 pm' },
    { name: 'Breakfast with Geico', startDate: 'June 28, 2015, 8:30 am'},
    { name: 'Taxes due', startDate: 'June 12, 2015, 12:00 am'}
  ])
});
