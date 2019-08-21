import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | calendar-event', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    const event = {
      name: 'Homework due',
      startDate: '2015-07-02T03:30',
      endDate: '2015-07-02T04:30',
      cluster: { totalLevels: 1 }
    };

    this.set('event', event);
    await render(hbs`<CalendarEvent @event={{event}} />`);
    assert.equal(this.element.textContent.trim(), event.name);
  });
});
