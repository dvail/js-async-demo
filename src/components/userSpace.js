import m from 'mithril'

import { classes } from '../util'

import JsRuntime from './jsRuntime'
import Console from './console'

import { SampleFunctions } from "../syntheticFns"

let UserSpace = classes` flex flex-col flex-grow-3 p-4 bg-blue-100 `
let Button = 'button.uk-button.uk-button-primary'

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    UserSpace,
    m('h2', 'User Space'),
    m(
      classes` flex flex-row `,
      m(JsRuntime, { states, actions }),
      m(Console),
    ),
    m(
      'div', // TODO  Componentize these
      m(Button, { onclick: () => actions.SimulateClick(SampleFunctions.twoCalls()) }, 'Sym Fn'),
      m(Button, 'Sym Net Call'),
      m(Button, 'Sym Timeout'),
    ),
  ),
})
