import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | el daily calendar', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.owner.factoryFor('component:el-daily-calendar').create();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });
});
