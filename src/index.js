import m from 'mithril'

import { initMeiosis } from './appState';
import Root from './components/root'

import './index.css'

const mRoot = document.querySelector('.app')

const initialState = {
    threads: [
      {},
    ],
    cpus: [
      {},
    ],
    eventQueue: [],
    networkCalls: [],
    timeouts: [],
}

const { states, actions } = initMeiosis()

// Expose state for console fun
window.app = new Proxy({
  states,
  actions,
}, {
  get: function(obj, prop) {
    if (prop === 'actions') window.requestAnimationFrame(m.redraw)
    return obj[prop];
  }
}); 

m.mount(mRoot, { view: () => m(Root, { states, actions }) });
