import Week from 'el-calendar/models/week';
import { test } from 'qunit';

QUnit.module('Unit — Week');

test('Week.create returns the correct week', function (assert) {
  let week = Week.create({ date: '2015-06-19' });
  assert.equal(week.days[0].date, '2015-06-14');
});
