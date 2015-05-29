import Month from 'el-calendar/models/month';
import { test } from 'qunit';

QUnit.module('Unit — Month');

test('Month.weeks returns the correct first week', function (assert) {
  assert.equal(Month.weeks('2015-06-25')[0][0]['plainDate'], '2015-05-31');
  assert.equal(Month.weeks('2015-06-25')[0][0]['dayOfWeek'], 'Sunday');
});
