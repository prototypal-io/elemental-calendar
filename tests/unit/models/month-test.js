import Month from 'el-calendar/models/month';
import { test } from 'qunit';

QUnit.module('Unit — Month');

test('Month.weeks returns the correct first week', function (assert) {
  let month = Month.create({ date: '2015-06-24', events: [{ date: '2015-06-25', name: 'Meeting with blah' }] });
  assert.equal(month.weeks[0].days[0].date, '2015-05-31');
});
