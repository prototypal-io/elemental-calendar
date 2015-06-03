import Month from 'el-calendar/models/month';
import { test } from 'qunit';

QUnit.module('Unit — Month');

test('month.get("weeks") returns the correct first week', function (assert) {
  let month = Month.create({ date: '2015-06-24', events: [{ date: '2015-06-25', name: 'Meeting with blah' }] });
  assert.equal(month.get('weeks.firstObject.days.firstObject.formattedDate'), '2015-05-31');
});
