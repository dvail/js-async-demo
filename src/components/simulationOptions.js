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
  let newSpeed = parseInt(e.target.value, 10);

  if (Number.isNaN(newSpeed)) return;
  if (newSpeed < 1)           return;

  actions.SetClockSpeed(newSpeed);
}

function timeoutDelayChange(e, actions) {
  let newDelay = parseInt(e.target.value, 10);

  if (Number.isNaN(newDelay)) return;
  if (newDelay < 0)           return;

  actions.SetTimeoutDelay(newDelay);
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
    ),
    m(
      'label',
      'Timeout Delay:',
      m('input[type="text"]', {
        value: states().timeoutDelay,
        onkeyup: e => timeoutDelayChange(e, actions),
      }),
    ),
  ),
})
