import m from 'mithril'

import { twComponent } from '../util'

function threadCountChange(e, actions) {
  let newCount = parseInt(e.target.value, 10);

  if (isNaN(newCount)) return;
  if (newCount > 4)    return;
  if (newCount < 1)    return;

  actions.SetThreadCount(newCount);
}

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    'div', 
    m(
      'label',
      'Thread Count:',
      m('input[type="text"]', { value: 1, onkeyup: e => threadCountChange(e, actions) } ),
    ),
  ),
})
