import Hour from 'el-calendar/models/hour';
import { module, test } from 'qunit';
import EventList from 'el-calendar/models/event-list';

module('Unit — Hour', function() {
  test('Hour#events returns the correct events when provided an eventList', function (assert) {
    let events = [
      { name: 'Japanese Studies', startDate: "2015-08-03T17:30" },
      { name: 'Geopolitics 446', startDate: "2015-08-05T08:30" },
      { name: 'Neuroimmunology 101', startDate: "2015-08-03T17:15" }
    ];
    let eventList = EventList.create({ events: events });
    let hour = Hour.create({ datetime: '2015-08-03T17:00', eventList: eventList });
    let anotherHour = Hour.create({ datetime: '2015-08-05T08:00', eventList: eventList });

    assert.equal(hour.events.length, 2);
    assert.equal(hour.events.filterBy('name', 'Japanese Studies').length, 1);
    assert.equal(hour.events.filterBy('name', 'Neuroimmunology 101').length, 1);

    assert.equal(anotherHour.events.length, 1);
    assert.equal(anotherHour.events.filterBy('name', 'Geopolitics 446').length, 1);
  });
});
