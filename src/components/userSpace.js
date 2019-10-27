import m from 'mithril'

import { twComponent } from '../util'
import { SampleFunctions } from "../syntheticFns"
import cpuIcon from '../../res/cpu.svg'

import Thread from './thread'

let JsRuntimeLayout  = twComponent(' flex flex-col bg-white flex-grow ')
let JsRuntimeHeading = twComponent(' text-lg ')
let CpuWrapper = twComponent(' w-20 h-20 mx-2 p-2 ')
let CpuIcon = {
  view: ({ attrs: { states, cpu } }) => m(
    twComponent('img', ' w-full h-full '),
    {
      class: cpu.thread ? 'animation-pulse' : 'filter-invert-50',
      src: cpuIcon,
      style: { animationDuration: `${states().clockSpeed / 1000}s` },
    },
  ),
}

let CpuCell = {
  view: ({ attrs: { states, model } }) => {
    let threadCpu = states().cpus.find(c => c?.thread === model.id)
    return m(
      CpuWrapper,
      threadCpu && m(CpuIcon, { states, cpu: threadCpu }),
    )
  },
}

let JsRuntime = {
  view: ({ attrs: { states } }) => m(
    JsRuntimeLayout,
    m(JsRuntimeHeading, 'JS Runtime'),
    m(
      twComponent(' flex flex-row flex-grow py-2 mx-1 '),
      states().threads.map(t => m(
        twComponent(' flex flex-col '),
        m(Thread, { model: t }),
        m(CpuCell, { states, model: t }),
      )),
    ),
  ),
}

let UserSpace  = twComponent(' flex flex-col flex-grow-3 p-4 bg-blue-100 ')
let Button     = twComponent('button', ' px-10 py-2 ')
let BlueButton = twComponent(Button, ' bg-blue-600 text-white ')

let CpuBank = {
  view: ({ attrs: { states } }) => m(
    twComponent(' w-20 m-2 '),
    states().cpus
      .filter(c => !c.thread)
      .map(cpu => m(CpuWrapper, m(CpuIcon, { states, cpu }))),
  ),
}

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    UserSpace,
    m(
      twComponent(' flex flex-row flex-grow '),
      m(CpuBank, { states }),
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
