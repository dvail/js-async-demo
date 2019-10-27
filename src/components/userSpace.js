import m from 'mithril'

import { twComponent } from '../util'
import { SampleFunctions } from "../syntheticFns"
import cpuIcon from '../../res/cpu.svg'

import Thread from './thread'

let JsRuntimeLayout  = twComponent(' flex flex-col bg-white flex-grow ')
let JsRuntimeHeading = twComponent(' text-lg ')
let CpuWrapper = twComponent(' w-20 h-20 mx-2 p-2 ')
let CpuIcon = {
  view: ({ attrs: { states } }) => m(
    twComponent('img', ' w-full h-full animation-pulse '),
    {
      src: cpuIcon,
      style: { animationDuration: `${states().clockSpeed / 1000}s` },
    },
  ),
}

let CpuCell = {
  view: ({ attrs: { states, model } }) => {
    let threadCpu = states().cpus.find(c => c.thread === model)
    return m(
      CpuWrapper,
      threadCpu && m(CpuIcon, { states }),
    )
  },
}

let JsRuntime = {
  view: ({ attrs: { states } }) => m(
    JsRuntimeLayout,
    m(JsRuntimeHeading, 'JS Runtime'),
    m(
      twComponent(' flex flex-row flex-grow py-2 mx-1 '),
      m(
        twComponent(' flex flex-col '),
        states().threads.map(t => m(Thread, { model: t })),
        states().threads.map(t => m(CpuCell, { states, model: t })),
      ),
    ),
  ),
}

let UserSpace  = twComponent(' flex flex-col flex-grow-3 p-4 bg-blue-100 ')
let Button     = twComponent('button', ' px-10 py-2 ')
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
      m(BlueButton, { onclick: () => actions.AddToEventQueue(SampleFunctions.timeoutCall(states().timeoutDelay, 'oneCalls')) }, 'Sym Timeout'),
    ),
  ),
})
