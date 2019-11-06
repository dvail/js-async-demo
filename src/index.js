import { filter, shuffle } from 'lodash'
import m from 'mithril'

import initMeiosis, { ThreadModel, CpuModel } from './appState'
import Root from './components/root'

import './index.css'

const initialState = {
  showBrowserEngine: true,
  clockSpeed: 250,
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
    return obj[prop]
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

// Handles multiprocessing and CPU switching
setInterval(() => {
  let { cpus, threads, clockSpeed } = states()
  let cpusReadyToSwitch = cpus.filter(cpu => {
    let thread = threads.find(t => t.id === cpu.thread)
    return !thread
        || !thread.callstack.length
        || ((Date.now() - cpu.activeTime) > (5 * clockSpeed))
  })
  let cpuThreadIds = cpus.map(cpu => cpu.thread)
  let currentActiveThreads = threads.filter(t => cpuThreadIds.includes(t.id))
  let threadsWaiting = threads
    |> filter(?, t => !currentActiveThreads.includes(t))
    |> filter(?, t => t.callstack.length)
    |> shuffle // shuffle helps ensures threads do not get starved

  cpusReadyToSwitch.forEach(cpu => {
    let candidateThread = threadsWaiting.find(t => cpu.t !== t)
    if (candidateThread) {
      actions.ChangeCpuThread({ cpu, thread: candidateThread })
      threadsWaiting = threadsWaiting.filter(t => t.id !== candidateThread.id)
      m.redraw()
    }
  })
}, 100)

const mRoot = document.querySelector('.app')

m.mount(mRoot, { view: () => m(Root, { states, actions }) })
