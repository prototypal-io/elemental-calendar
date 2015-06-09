import Day from 'el-calendar/models/day';
import { test } from 'qunit';
import EventList from 'el-calendar/models/event-list';
import Ember from 'ember';

QUnit.module('Unit — Day');

test('Day#get("hours") returns the correct hours', function (assert) {
  let eventList = EventList.create({ events: Ember.A() });
  let day = Day.create({ date: '2015-07-02', eventList: eventList });

  assert.equal(day.get('hours.firstObject.formattedHour'), "12:00 am");
  assert.equal(day.get('hours.lastObject.formattedHour'), "11:00 pm");
  assert.equal(day.get('hours.length'), 24);
});

test('Day#events returns the correct events when provided an eventList', function(assert) {
  let events = [
    { name: 'Basket Weaving', startDate: '2015-07-11T19:20' },
    { name: 'Economics 101', startDate: '2015-07-13T23:11' }
  ];
  let eventList = EventList.create({ events: events });
  let day = Day.create({ date: '2015-07-11', eventList: eventList });

  assert.equal(day.events.length, 1);
  assert.equal(day.events[0].name, 'Basket Weaving');
});

test('Day#get("dayName") returns the correct day name', function(assert) {
  let eventList = EventList.create({ events: Ember.A() });
  let sunday = Day.create({ date: '2015-06-28', eventList: eventList });
  let thursday = Day.create({ date: '2015-06-11', eventList: eventList });

  assert.equal(sunday.get('dayName'), 'Sunday');
  assert.equal(thursday.get('dayName'), 'Thursday');
});
