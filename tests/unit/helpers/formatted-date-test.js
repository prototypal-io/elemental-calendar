import { formattedDate } from 'el-calendar/helpers/formatted-date';
import { module, test } from 'qunit';

module('Unit | Helper | formatted date');

// Replace this with your real tests.
test('it handles weekly-header formatting correctly', function(assert) {
  var result = formattedDate(['2015-07-21'], { type: 'weekly-header' });
  assert.equal(result, 'Tue 7/21');
});

test('it handles monthly-day formatting correctly', function(assert) {
  var result = formattedDate(['2015-06-28'], { type: 'monthly-day' });
  assert.equal(result, '28');
});

test('it handles daily-header formatting correctly', function(assert) {
  var result = formattedDate(['2015-04-12'], { type: 'daily-header'});
  assert.equal(result, 'Sunday 4/12');
});
