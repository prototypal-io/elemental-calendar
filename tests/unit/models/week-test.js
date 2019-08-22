import { A } from '@ember/array';
import Week from 'elemental-calendar/models/week';
import { module, test } from 'qunit';
import EventList from 'elemental-calendar/models/event-list';

module('Unit — Week', function() {
  test('Week#get("days") returns the correct first and last days', function (assert) {
    let week = Week.create({ date: '2015-06-19', events: A() });

    assert.equal(week.get('days.firstObject.formattedDate'), '2015-06-14');
    assert.equal(week.get('days.lastObject.formattedDate'), '2015-06-20');
  });

  test('Week#next returns the correct next week', function(assert) {
    let events = A();
    let eventList = EventList.create({ events: events });
    let week = Week.create({ date: '2015-07-21', eventList: eventList });
    let nextWeek = week.next();

    assert.equal(nextWeek.get('days.firstObject.formattedDate'), '2015-07-26');
    assert.equal(nextWeek.get('days.lastObject.formattedDate'), '2015-08-01');
  });

  test('Week#previous returns the correct previous week', function(assert) {
    let events = A();
    let eventList = EventList.create({ events: events });
    let week = Week.create({ date: '2015-07-21', eventList: eventList });
    let previousWeek = week.previous();

    assert.equal(previousWeek.get('days.firstObject.formattedDate'), '2015-07-12');
    assert.equal(previousWeek.get('days.lastObject.formattedDate'), '2015-07-18');
  });
});
