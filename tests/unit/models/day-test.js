import { A } from '@ember/array';
import Day from 'el-calendar/models/day';
import { module, test } from 'qunit';
import EventList from 'el-calendar/models/event-list';

module('Unit — Day', function() {
  test('Day#get("hours") returns the correct hours', function (assert) {
    let eventList = EventList.create({ events: A() });
    let day = Day.create({ date: '2015-07-02', eventList: eventList });

    assert.equal(day.get('hours.firstObject.formattedHour'), "12:00 am");
    assert.equal(day.get('hours.lastObject.formattedHour'), "11:00 pm");
    assert.equal(day.get('hours.length'), 24);
  });

  test('Day#events returns the correct events when provided an eventList', function(assert) {
    let events = [
      { name: 'Basket Weaving', startDate: '2015-07-11T19:20', endDate: '2015-07-11T19:40' },
      { name: 'Economics 101', startDate: '2015-07-13T23:11', endDate: '2015-07-13T23:50' }
    ];
    let eventList = EventList.create({ events: events });
    let day = Day.create({ date: '2015-07-11', eventList: eventList });

    assert.equal(day.events.length, 1);
    assert.equal(day.events[0].name, 'Basket Weaving');
  });

  test('Day#get("dayName") returns the correct day name', function(assert) {
    let eventList = EventList.create({ events: A() });
    let sunday = Day.create({ date: '2015-06-28', eventList: eventList });
    let thursday = Day.create({ date: '2015-06-11', eventList: eventList });

    assert.equal(sunday.get('dayName'), 'Sunday');
    assert.equal(thursday.get('dayName'), 'Thursday');
  });

  test('Day#get("hours") returns the correct hours on DST start day', function (assert) {
    let eventList = EventList.create({ events: A() });
    let day = Day.create({ date: '2016-11-06', eventList: eventList });

    assert.equal(day.get('hours.firstObject.formattedHour'), "12:00 am");
    assert.equal(day.get('hours.lastObject.formattedHour'), "11:00 pm");
    assert.equal(day.get('hours.length'), 24);
  });

  test('Day#get("hours") returns the correct hours on DST end day', function (assert) {
    let eventList = EventList.create({ events: A() });
    let day = Day.create({ date: '2016-03-13', eventList: eventList });

    assert.equal(day.get('hours.firstObject.formattedHour'), "12:00 am");
    assert.equal(day.get('hours.lastObject.formattedHour'), "11:00 pm");
    assert.equal(day.get('hours.length'), 24);
  });
});
