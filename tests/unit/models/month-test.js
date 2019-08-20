import { A } from '@ember/array';
import Month from 'el-calendar/models/month';
import { module, test } from 'qunit';
import EventList from 'el-calendar/models/event-list';

module('Unit — Month', function() {
  test('Month#get("weeks") returns an array of week objects with the right days', function (assert) {
    let eventList = EventList.create({ events: A() });
    let month = Month.create({ date: '2015-06-24', eventList: eventList });
    assert.equal(month.get('weeks.firstObject.days.firstObject.formattedDate'), '2015-05-31');
    assert.equal(month.get('weeks.lastObject.days.lastObject.formattedDate'), '2015-07-04');
  });

  test('Month#get("weeks") returns correct weeks for 6 week month', function (assert) {
    let eventList = EventList.create({ events: A() });
    let month = Month.create({ date: '2015-08-01', eventList: eventList });
    assert.equal(month.get('weeks.firstObject.days.firstObject.formattedDate'), '2015-07-26');
    assert.equal(month.get('weeks.lastObject.days.lastObject.formattedDate'), '2015-09-05');
  });
});
