import m from 'mithril'

import { twComponent } from '../util'

function cpuCountChange(e, actions) {
  let newCount = parseInt(e.target.value, 10);

  if (Number.isNaN(newCount)) return;
  if (newCount > 4)           return;
  if (newCount < 1)           return;

  actions.SetCpuCount(newCount);
}

function threadCountChange(e, actions) {
  let newCount = parseInt(e.target.value, 10);

  if (Number.isNaN(newCount)) return;
  if (newCount > 8)           return;
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

function LabeledInput(label, type, inputAttrs) {
  return m('label', label, m(`input[type="${type}"]`, inputAttrs))
}

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    'div',
    LabeledInput('Show Browser Engine:', 'checkbox', {
      value: states().showBrowserEngine,
      onclick: e => actions.SetShowBrowserEngine(e.target.checked),
    }),
    LabeledInput('Thread Count:', 'text', {
      value: states().threads.length,
      onkeyup: e => threadCountChange(e, actions),
    }),
    LabeledInput('CPU Count:', 'text', {
      value: states().cpus.length,
      onkeyup: e => cpuCountChange(e, actions),
    }),
    LabeledInput('Clock Speed:', 'text', {
      value: states().clockSpeed,
      onkeyup: e => clockSpeedChange(e, actions),
    }),
    LabeledInput('Timeout Delay:', 'text', {
      value: states().timeoutDelay,
      onkeyup: e => timeoutDelayChange(e, actions),
    }),
  ),
})
