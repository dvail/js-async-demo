import _ from 'lodash'
import m from 'mithril'

import initMeiosis, { ThreadModel, CpuModel } from './appState';
import Root from './components/root'

import './index.css'

const initialState = {
  clockSpeed: 300,
  timeoutDelay: 1200,
  threads: [
    ThreadModel(),
  ],
  cpus: [
    CpuModel(),
  ],
  eventQueue: [],
  networkCalls: [],
  timeouts: [],
}

const { states, actions } = initMeiosis(initialState)

// Expose state for console fun
window.app = new Proxy({
  states,
  actions,
}, {
  get: (obj, prop) => {
    if (prop === 'actions') window.requestAnimationFrame(m.redraw)
    return obj[prop];
  },
})

function clockTick() {
  let idleThread = states().threads.find(t => !t.callstack.length)
  let eventQueueEmpty = states().eventQueue.length < 1

  if (idleThread && !eventQueueEmpty) {
    actions.TakeFromEventQueue()
  }

  actions.ProcessThreads()
  m.redraw()
  setTimeout(clockTick, states().clockSpeed)
}

clockTick()

let cpuPreemptRate = 2000
setInterval(() => {
  let cpusReadyToSwitch = states().cpus.filter(cpu => {
    return !cpu.thread
        || !cpu.thread.callstack.length
        || ((Date.now() - cpu.activeTime) > cpuPreemptRate)
  })
  let currentActiveThreads = states().cpus.map(c => c.thread && c.thread.callstack.length)

  let waitingThreads = states().threads
    |> (threads => _.filter(threads, t => !currentActiveThreads.includes(t)))
    |> (threads => _.filter(threads, t => t.callstack.length))
    |> _.shuffle

  cpusReadyToSwitch.forEach(cpu => {
  })

  console.warn(cpusReadyToSwitch)
  console.warn(waitingThreads)
}, 100)

const mRoot = document.querySelector('.app')

m.mount(mRoot, { view: () => m(Root, { states, actions }) });
