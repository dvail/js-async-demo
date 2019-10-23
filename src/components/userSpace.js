import m from 'mithril'

import { twComponent } from '../util'
import { SampleFunctions } from "../syntheticFns"

import Thread from './thread'

let JsRuntimeLayout = twComponent(' flex flex-col bg-white flex-grow ')
let Heading = twComponent(' text-lg ')

const JsRuntime = {
  view: ({ attrs: { states } }) => m(
    JsRuntimeLayout,
    m(Heading, 'JS Runtime'),
    m(
      twComponent(' flex flex-row flex-grow py-2 mx-1 '),
      states().threads.map(t => m(Thread, { model: t })),
    ),
  ),
}

let UserSpace = twComponent(' flex flex-col flex-grow-3 p-4 bg-blue-100 ')
let Button = twComponent('button', ` px-10 py-2 `)
let BlueButton = twComponent(Button, ' bg-blue-600 text-white ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    UserSpace,
    m('h2', 'User Space'),
    m(
      twComponent(' flex flex-row flex-grow '),
      m(JsRuntime, { states, actions }),
    ),
    m(
      'div',
      m(BlueButton, { onclick: () => actions.AddToEventQueue(SampleFunctions.twoCalls()) }, 'Sym Fn'),
      m(BlueButton, { onclick: () => actions.AddToEventQueue(SampleFunctions.netCall('oneCalls')) }, 'Sym Net Call'),
      m(BlueButton, { onclick: () => actions.AddToEventQueue(SampleFunctions.timeoutCall(1200, 'oneCalls')) }, 'Sym Timeout'),
    ),
  ),
})
