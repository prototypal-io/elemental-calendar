import Hour from 'el-calendar/models/hour';
import { test } from 'qunit';
import EventList from 'el-calendar/models/event-list';

QUnit.module('Unit — Hour');

test('hour.events returns the correct events when provided an eventLists', function (assert) {
  let events = [
    { name: 'Japanese Studies', date: "August 3, 2015 5:00 pm" },
    { name: 'Geopolitics 446', date: "August 4, 2015 2:00 pm" },
    { name: 'Neuroimmunology 101', date: "August 3, 2015 5:00 pm" }
  ];
  let eventList = EventList.create({ events: events });
  let hour = Hour.create({ datetime: 'August 3, 2015 5:00 pm', eventList: eventList });

  assert.equal(hour.events.length, 2);
  assert.equal(hour.events.filterBy('name', 'Japanese Studies').length, 1);
  assert.equal(hour.events.filterBy('name', 'Neuroimmunology 101').length, 1);
});
