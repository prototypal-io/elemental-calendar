import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('monthly', { path: '/monthly/:month_date' });
  this.route('weekly', { path: '/weekly/:week_date' });
  this.route('daily', { path: '/daily/:day_date' });
});

export default Router;
