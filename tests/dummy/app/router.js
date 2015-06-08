import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('monthly');
  this.route('weekly');
  this.route('daily');
});

export default Router;
