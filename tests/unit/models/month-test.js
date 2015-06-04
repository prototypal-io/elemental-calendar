import Month from 'el-calendar/models/month';
import { test } from 'qunit';
import Ember from 'ember';
import EventList from 'el-calendar/models/event-list';

QUnit.module('Unit — Month');

test('Month#get("weeks") returns an array of week objects with the right days', function (assert) {
  let eventList = EventList.create({ events: Ember.A() });
  let month = Month.create({ date: '2015-06-24', eventList: eventList });
  assert.equal(month.get('weeks.firstObject.days.firstObject.formattedDate'), '2015-05-31');
  assert.equal(month.get('weeks.lastObject.days.lastObject.formattedDate'), '2015-07-04');
});
