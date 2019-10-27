import _ from 'lodash'
import m from 'mithril'

import initMeiosis, { ThreadModel, CpuModel } from './appState';
import Root from './components/root'

import './index.css'

const initialState = {
  showBrowserEngine: false,
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

setInterval(() => {
  let cpusReadyToSwitch = states().cpus.filter(cpu => {
    return !cpu.thread
        || !cpu.thread.callstack.length
        || ((Date.now() - cpu.activeTime) > (5 * states().clockSpeed))
  })
  let currentActiveThreads = states().cpus.map(c => c.thread && c.thread.callstack.length)

  let threadsWaiting = states().threads
    |> _.filter(?, t => !currentActiveThreads.includes(t))
    |> _.filter(?, t => t.callstack.length)
    |> _.shuffle // shuffle ensures threads do not get starved

  cpusReadyToSwitch.forEach(cpu => {
    let candidateThread = threadsWaiting.find(t => cpu.t !== t)
    if (candidateThread) {
      actions.ChangeCpuThread({ cpu, thread: candidateThread })
      threadsWaiting = threadsWaiting.filter(t => t !== candidateThread)
      m.redraw()
    }
  })
}, 100)

const mRoot = document.querySelector('.app')

m.mount(mRoot, { view: () => m(Root, { states, actions }) });
