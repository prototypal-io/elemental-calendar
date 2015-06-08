import { formattedDate } from 'el-calendar/helpers/formatted-date';
import { module, test } from 'qunit';

module('Unit | Helper | formatted date');

// Replace this with your real tests.
test('it handles weekly-header formatting correctly', function(assert) {
  var result = formattedDate(['2015-07-21'], { type: 'weekly-header' });
  assert.equal(result, 'Tue 7/21');
});
