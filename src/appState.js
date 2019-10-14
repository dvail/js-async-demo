import stream from 'mithril/stream'
import produce from 'immer'
import _ from 'lodash'

import { SampleFunctions } from './syntheticFns'

export function ThreadModel(fn) {
  return {
    callstack: fn ? [fn] : [],
  }
}

export default function initMeiosis(initialState = {}) {
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
    SetThreadCount: produceUpdate((prev, next, count) => {
      while (next.threads.length > count) {
        next.threads.shift()
      }

      while (next.threads.length < count) {
        actions.AddThread()
      }
    }),
    TakeFromEventQueue: produceUpdate((prev, next) => {
      let nextFn = next.eventQueue.pop()
      let idleThreadIndex = next.threads.findIndex(t => !t.callstack.length)

      if (nextFn) {
        next.threads[idleThreadIndex] = ThreadModel(nextFn)
      }
    }),
    ProcessThreads: produceUpdate((prev, next) => {
      // TODO Refactor this
      next.threads.forEach(t => {
        let topOfStack = _.last(t.callstack, null)

        if (!topOfStack) return

        let nextLine = topOfStack.lines.find(l => !l.done)

        if (!nextLine) {
          t.callstack.pop()
          return
        }

        if (nextLine.type === 'fnCall') {
          t.callstack.push(SampleFunctions[nextLine.fn]())
        }

        nextLine.done = true
      })
    }),
    SimulateClick: produceUpdate((prev, next, synthCallback) => {
      next.eventQueue.push(synthCallback)
    }),
    AddThread: produceUpdate((prev, next) => {
      next.threads.push(ThreadModel())
    }),
    AddCpu: produceUpdate((prev, next) => {
      next.cpus.push({})
    }),
  }

  return {
    states,
    actions,
  }
}
