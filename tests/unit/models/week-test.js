import Week from 'el-calendar/models/week';
import { test } from 'qunit';
import Ember from 'ember';

QUnit.module('Unit — Week');

test('Week.create returns the correct week', function (assert) {
  let week = Week.create({ date: '2015-06-19', events: Ember.A() });
  assert.equal(week.get('days.firstObject.formattedDate'), '2015-06-14');
});
