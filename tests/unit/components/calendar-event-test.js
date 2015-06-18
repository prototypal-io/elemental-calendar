import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('calendar-event', 'Unit | Component | calendar event', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(4);

  // Creates the component instance
  var component = this.subject({
    event: { name: 'Homework due', startDate: '2015-07-02T03:30', endDate: '2015-07-02T04:30', cluster: { totalLevels: 1 } },
  });
  assert.equal(component._state, 'preRender');

  assert.equal(component.calculateTop(), 14.5833);
  assert.equal(component.calculateHeight(), 4.1667);

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
