import Day from 'el-calendar/models/day';
import { test } from 'qunit';
import EventList from 'el-calendar/models/event-list';
import Ember from 'ember';

QUnit.module('Unit — Day');

test('day.get("hours") returns the correct hours', function (assert) {
  let eventList = EventList.create({ events: Ember.A() });
  let day = Day.create({ date: '2015-07-02', eventList: eventList });

  assert.equal(day.get('hours.firstObject.formattedHour'), "12:00 am");
  assert.equal(day.get('hours.lastObject.formattedHour'), "11:00 pm");
  assert.equal(day.get('hours.length'), 24);
});

test('day.events returns the correct events when provided an eventList', function(assert) {
  let events = [
    { name: 'Basket Weaving', date: "July 11, 2015 11:00 pm" },
    { name: 'Economics 101', date: "July 15, 2015 2:00 pm" }
  ];
  let eventList = EventList.create({ events: events });
  let day = Day.create({ date: '2015-07-11', eventList: eventList });

  assert.equal(day.events.length, 1);
  assert.equal(day.events[0].name, 'Basket Weaving');
});
