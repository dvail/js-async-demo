import stream from 'mithril/stream'
import produce from 'immer'

export function initMeiosis(initialState = {}) {
  let update = stream()
  let stateUpdate = (appState, fn) => fn(appState)

  let states = stream.scan(stateUpdate, initialState, update)

  // Uses Immer to imperitively create a next state and update the main stream
  function produceUpdate(producer) {
    return payload => {
      update(prev => produce(prev, next => producer(prev, next, payload)))
    }
  }

  let actions = {
    AddThread: produceUpdate((prev, next, e) => {
      next.threads.push({})
    }),
    AddCpu: produceUpdate((prev, next, e) => {
      next.cpus.push({})
    }),
  }

  return {
    states,
    actions,
  }
}
