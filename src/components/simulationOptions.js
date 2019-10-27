import m from 'mithril'

import { twComponent } from '../util'

function threadCountChange(e, actions) {
  let newCount = parseInt(e.target.value, 10);

  if (Number.isNaN(newCount)) return;
  if (newCount > 4)           return;
  if (newCount < 1)           return;

  actions.SetThreadCount(newCount);
}

function clockSpeedChange(e, actions) {
  let newCount = parseInt(e.target.value, 10);

  if (Number.isNaN(newCount)) return;
  if (newCount < 1)           return;

  actions.SetClockSpeed(newCount);
}

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    'div',
    m(
      'label',
      'Thread Count:',
      m('input[type="text"]', {
        value: states().threads.length,
        onkeyup: e => threadCountChange(e, actions),
      }),
    ),
    m(
      'label',
      'Clock Speed:',
      m('input[type="text"]', {
        value: states().clockSpeed,
        onkeyup: e => clockSpeedChange(e, actions),
      }),
    )
  ),
})
