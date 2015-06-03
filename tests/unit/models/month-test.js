import Month from 'el-calendar/models/month';
import { test } from 'qunit';
import Ember from 'ember';

QUnit.module('Unit — Month');

test('month.get("weeks") returns the correct first day of the first week and last of last week', function (assert) {
  let month = Month.create({ date: '2015-06-24', events: Ember.A() });
  assert.equal(month.get('weeks.firstObject.days.firstObject.formattedDate'), '2015-05-31');
  assert.equal(month.get('weeks.lastObject.days.lastObject.formattedDate'), '2015-07-04');
});
