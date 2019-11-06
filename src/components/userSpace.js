import m from 'mithril'

import { tw } from '../util'
import { SampleFunctions } from "../syntheticFns"
import cpuIcon from '../../res/cpu.svg'

import Thread from './thread'

let JsRuntimeLayout  = tw(' flex flex-col flex-grow ')
let CpuWrapper = tw(' w-20 h-20 mx-2 p-2 ')
let CpuIcon = {
  view: ({ attrs: { states, cpu } }) => m(
    tw('img', ' w-full h-full '),
    {
      class: cpu.thread ? 'animation-pulse filter-invert-25' : 'filter-invert-75',
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
    m(
      tw(' flex flex-row flex-grow py-2 mx-1 '),
      states().threads.map(t => m(
        tw(' flex flex-col '),
        m(Thread, { model: t }),
        m(CpuCell, { states, model: t }),
      )),
    ),
  ),
}

let UserSpace  = tw(' flex flex-col flex-grow-3 p-4 ')
let Button     = tw('button', ' px-10 py-2 text-white ')

let CpuBank = {
  view: ({ attrs: { states } }) => m(
    tw(' w-20 m-2 '),
    states().cpus
      .filter(c => !c.thread)
      .map(cpu => m(CpuWrapper, m(CpuIcon, { states, cpu }))),
  ),
}

let JsRuntimeHeading = tw(' text-3xl ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    UserSpace,
    states().showBrowserEngine && m(JsRuntimeHeading, 'JS Runtime'),
    m(
      tw(' flex flex-row flex-grow '),
      m(CpuBank, { states }),
      m(JsRuntime, { states, actions }),
    ),
    m(
      tw(' m-2 flex flex-row justify-around '),
      m(Button, { class: 'bg-indigo-500', onclick: () => actions.AddToEventQueue(SampleFunctions.twoCalls()) }, 'Simulate Fn'),
      m(Button, { class: 'bg-green-500', onclick: () => actions.AddToEventQueue(SampleFunctions.netCall('oneCalls')) }, 'Simulate Net Call'),
      m(Button, { class: 'bg-red-500', onclick: () => actions.AddToEventQueue(SampleFunctions.timeoutCall(states().timeoutDelay, 'oneCalls')) }, 'Simulate Timeout'),
    ),
  ),
})
