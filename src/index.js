import m from 'mithril'

import initMeiosis, { ThreadModel } from './appState';
import Root from './components/root'

import './index.css'

const initialState = {
  clockSpeed: 300,
  timeoutDelay: 1200,
  threads: [
    ThreadModel(),
  ],
  cpus: [
    {},
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

const mRoot = document.querySelector('.app')

m.mount(mRoot, { view: () => m(Root, { states, actions }) });
