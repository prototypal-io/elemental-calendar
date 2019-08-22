import { A } from '@ember/array';
import EventList from 'elemental-calendar/models/event-list';
import { module, test } from 'qunit';
import Day from 'elemental-calendar/models/day';

module('Unit — EventList', function() {
  test('EventList#forDay returns the correct events for single day events', function (assert) {
    let events = [
      { name: 'Meeting with Professor McGonagall', startDate: '2015-07-12T08:00', endDate: '2015-07-12T08:30' },
      { name: 'Defense Against the Dark Arts', startDate: '2015-07-13T05:30', endDate: '2015-07-13T06:30' },
      { name: 'Quidditch Practice', startDate: '2015-07-14T15:30', endDate: '2015-07-14T17:30' },
    ];
    let eventList = EventList.create({ events: events });
    let dayWithSnape = Day.create({ date: '2015-07-13', eventList: eventList });
    let quidditchPractice = Day.create({ date: '2015-07-14', eventList: eventList });
    let dayWithNoEvents = Day.create({ date: '2015-07-15', eventList: eventList });

    assert.equal(dayWithSnape.events.filterBy('name', 'Defense Against the Dark Arts').length, 1);
    assert.equal(quidditchPractice.events.filterBy('name', 'Quidditch Practice').length, 1);
    assert.equal(dayWithNoEvents.events.length, 0);
  });

  test('EventList#forDay returns the correct events for multi-day events', function(assert) {
    let events = [
      { name: 'Muster the Rohirrim', startDate: '2016-02-20T10:00', endDate: '2016-02-23T14:00' },
      { name: 'Drinks with Gandalf', startDate: '2016-02-21T21:00', endDate: '2016-02-22T00:00' },
      { name: 'Prepare Helms Deep', startDate: '2016-02-22T08:00', endDate: '2016-02-23T22:00' },
      { name: 'Ask Gondor for Aid', startDate: '2016-02-23T13:30', endDate: '2016-02-23T15:30' }
    ];
    let eventList = EventList.create({ events: events });
    let rohirrimDay = Day.create({ date: '2016-02-20', eventList: eventList });
    let gandalfDay = Day.create({ date: '2016-02-21', eventList: eventList });
    let helmsDeepDay = Day.create({ date: '2016-02-22', eventList: eventList });
    let gondorDay = Day.create({ date: '2016-02-23', eventList: eventList });

    assert.equal(rohirrimDay.events.filterBy('name', 'Muster the Rohirrim').length, 1);

    assert.equal(gandalfDay.events.length, 2);
    // assert.equal(gandalfDay.events.filterBy('name', 'Muster the Rohirrim')[0].endDate, '2016-02-21T23:59:59-08:00');
    // assert.equal(gandalfDay.events.filterBy('name', 'Drinks with Gandalf').length, 1);

    assert.equal(helmsDeepDay.events.length, 3);
    // assert.equal(helmsDeepDay.events.filterBy('name', 'Prepare Helms Deep'));

    assert.equal(gondorDay.events.length, 3);

    assert.ok(true);
  });

  test('EventList#buildClustersForDay builds the correct event clusters', function(assert) {
    let events = [
      { name: 'Alchemy 101', startDate: '2016-09-27T11:00', endDate: '2016-09-27T13:00' },
      { name: 'Macroeconomics 201', startDate: '2016-09-27T11:30', endDate: '2016-09-27T14:30' },
      { name: 'Public Speaking 321', startDate: '2016-09-27T16:00', endDate: '2016-09-27T18:00' },
      { name: 'Statistics 121', startDate: '2016-09-27T15:30', endDate: '2016-09-27T20:00' }
    ];

    let eventList = EventList.create({ events: events });
    let day = Day.create({ date: '2016-09-27', eventList: eventList });
    let clusteredEvents = A(eventList.buildClusteredEventsForDay(day));

    assert.equal(clusteredEvents.length, 4);
    assert.equal(clusteredEvents.findBy('name', 'Alchemy 101').cluster.startDate, '2016-09-27T11:00');
    assert.equal(clusteredEvents.findBy('name', 'Alchemy 101').cluster.endDate, '2016-09-27T14:30');

    assert.equal(clusteredEvents.findBy('name', 'Statistics 121').cluster.startDate, '2016-09-27T15:30');
    assert.equal(clusteredEvents.findBy('name', 'Statistics 121').cluster.endDate, '2016-09-27T20:00');

  });

  test('EventList#buildLevelsForClusters builds the correct levels for event clusters', function(assert) {
    let events = [
      { name: 'Alchemy 101', startDate: '2016-09-27T11:00', endDate: '2016-09-27T13:00' },
      { name: 'Macroeconomics 201', startDate: '2016-09-27T11:30', endDate: '2016-09-27T14:30' },
      { name: 'Public Speaking 321', startDate: '2016-09-27T16:00', endDate: '2016-09-27T18:00' },
      { name: 'Statistics 121', startDate: '2016-09-27T15:30', endDate: '2016-09-27T20:00' }
    ];

    let eventList = EventList.create({ events: events });
    let day = Day.create({ date: '2016-09-27', eventList: eventList });
    let clusteredEvents = A(eventList.buildClusteredEventsForDay(day));

    assert.equal(clusteredEvents.findBy('name', 'Alchemy 101').level, 0);
    assert.equal(clusteredEvents.findBy('name', 'Macroeconomics 201').level, 1);
    assert.equal(clusteredEvents.findBy('name', 'Public Speaking 321').level, 0);
    assert.equal(clusteredEvents.findBy('name', 'Statistics 121').level, 1);

    assert.equal(clusteredEvents.findBy('name', 'Macroeconomics 201').cluster.totalLevels, 2);
    assert.equal(clusteredEvents.findBy('name', 'Public Speaking 321').cluster.totalLevels, 2);
  });
});
