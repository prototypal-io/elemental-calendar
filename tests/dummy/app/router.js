import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('monthly', { path: '/monthly/:month_date' });
  this.route('weekly', { path: '/weekly/:week_date' });
  this.route('daily', { path: '/daily/:day_date' });
});

export default Router;
