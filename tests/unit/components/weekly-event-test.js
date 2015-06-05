import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('weekly-event', 'Unit | Component | weekly event', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject({
    event: { name: 'Homework due', date: '2015-07-02T03:30' }
  });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
