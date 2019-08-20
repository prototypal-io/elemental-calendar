import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | calendar event', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(4);

    // Creates the component instance
    var component = this.owner.factoryFor('component:calendar-event').create({
      event: { name: 'Homework due', startDate: '2015-07-02T03:30', endDate: '2015-07-02T04:30', cluster: { totalLevels: 1 } },
    });
    assert.equal(component._state, 'preRender');

    assert.equal(component.calculateTop(), 14.5833);
    assert.equal(component.calculateHeight(), 4.1667);

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });
});
