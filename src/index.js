import m from 'mithril'

import initMeiosis, { ThreadModel } from './appState';
import Root from './components/root'

import './index.css'

const mRoot = document.querySelector('.app')

const initialState = {
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

setInterval(() => {
  let idleThread = states().threads.find(t => !t.callstack.length)

  if (idleThread) {
    actions.TakeFromEventQueue()
  }

  actions.ProcessThreads()
  m.redraw()
}, 300)

m.mount(mRoot, { view: () => m(Root, { states, actions }) });
