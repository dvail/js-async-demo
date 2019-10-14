import m from 'mithril'

import { twComponent } from '../util'

import JsRuntime from './jsRuntime'
import Console from './console'
import Button from './button'

import { SampleFunctions } from "../syntheticFns"

let UserSpace = twComponent(' flex flex-col flex-grow-3 p-4 bg-blue-100 ')

let blueButtonClass = ' bg-blue-600 text-white '

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    UserSpace,
    m('h2', 'User Space'),
    m(
      twComponent(' flex flex-row flex-grow '),
      m(JsRuntime, { states, actions }),
      m(Console),
    ),
    m(
      'div',
      m(Button, {
        class: blueButtonClass,
        onclick: () => actions.AddToEventQueue(SampleFunctions.twoCalls()),
      }, 'Sym Fn'),
      m(Button, {
        class: blueButtonClass,
        onclick: () => actions.AddToEventQueue(SampleFunctions.netCall('oneCalls')),
      }, 'Sym Net Call'),
      m(Button, {
        class: blueButtonClass,
        onclick: () => actions.AddToEventQueue(SampleFunctions.timeoutCall(1200, 'netCall')),
      }, 'Sym Timeout'),
    ),
  ),
})
