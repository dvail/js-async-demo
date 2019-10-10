
import m from 'mithril'

import { classes } from '../util'

import JsRuntime from './jsRuntime'
import Console from './console'

let UserSpace = classes` flex flex-col flex-grow-3 p-4 bg-blue-100 `
let Button = 'button.uk-button.uk-button-primary'

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    UserSpace,
    m('h2', 'User Space'),
    m(
      classes` flex flex-row `,
      m(JsRuntime),
      m(Console),
    ),
    m(
      'div', // TODO  Componentize these
      m(Button, 'Sym Fn'),
      m(Button, 'Sym Net Call'),
      m(Button, 'Sym Timeout'),
    ),
  ),
})
