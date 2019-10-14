import stream from 'mithril/stream'
import produce from 'immer'
import _ from 'lodash'
import { multi, method } from '@arrows/multimethod'


import { SampleFunctions } from './syntheticFns'

export function ThreadModel(fn) {
  return {
    callstack: fn ? [fn] : [],
  }
}

const execLine = multi(
  (nextState, { type }) => type,

  method('runcode', () => {
    // TODO log to virtual console
  }),

  method('fnCall', (nextState, line, thread) => {
    thread.callstack.push(SampleFunctions[line.fn]())
  }),

  method('netCall', (nextState, line) => {
    nextState.networkCalls.push({
      fn: SampleFunctions[line.fn](),
    })
  }),

  method('timeoutCall', (nextState, line) => {
    nextState.timeouts.push({
      fn: SampleFunctions[line.fn](),
      delay: line.delay,
    })
  }),
)

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
    SimulateClick: produceUpdate((prev, next, synthCallback) => {
      next.eventQueue.push(synthCallback)
    }),
    AddThread: produceUpdate((prev, next) => {
      next.threads.push(ThreadModel())
    }),
    AddCpu: produceUpdate((prev, next) => {
      next.cpus.push({})
    }),
    ProcessThreads: produceUpdate((prev, next) => {
      next.threads.forEach(thread => {
        let topOfStack = _.last(thread.callstack, null)

        if (!topOfStack) return

        let nextLine = topOfStack.lines.find(l => !l.done)

        if (!nextLine) {
          thread.callstack.pop()
          return
        }

        execLine(next, nextLine, thread)
        nextLine.done = true
      })
    }),

  }

  return {
    states,
    actions,
  }
}
