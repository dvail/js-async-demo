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

export default function initMeiosis(initialState = {}) {
  let update = stream()
  let stateUpdate = (appState, fn) => fn(appState)

  let actions = {}
  let states = stream.scan(stateUpdate, initialState, update)

  // Uses Immer to imperitively create a next state and update the main stream
  function produceUpdate(producer) {
    return payload => {
      update(prev => produce(prev, next => producer(prev, next, payload)))
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
      let callObj = { fn: SampleFunctions[line.fn]() }
      nextState.networkCalls.push(callObj)

      setTimeout(() => {
        actions.NetworkCallResolved(callObj)
      }, 1500)
    }),

    method('timeoutCall', (nextState, line) => {
      let callObj = { fn: SampleFunctions[line.fn]() }
      nextState.timeouts.push(callObj)

      setTimeout(() => {
        actions.TimeoutResolved(callObj)
      }, line.delay)
    }),
  )

  actions = {
    SetClockSpeed: produceUpdate((prev, next, speed) => {
      next.clockSpeed = speed
    }),
    SetThreadCount: produceUpdate((prev, next, count) => {
      while (next.threads.length > count) {
        next.threads.shift()
      }

      while (next.threads.length < count) {
        next.threads.push(ThreadModel())
      }
    }),
    TakeFromEventQueue: produceUpdate((prev, next) => {
      let nextFn = next.eventQueue.shift()
      let idleThreadIndex = next.threads.findIndex(t => !t.callstack.length)

      if (nextFn) {
        next.threads[idleThreadIndex] = ThreadModel(nextFn)
      }
    }),
    NetworkCallResolved: produceUpdate((prev, next, callObj) => {
      next.networkCalls = next.networkCalls.filter(nc => nc === callObj)
      next.eventQueue.push({ ...callObj.fn, type: 'net callback' })
    }),
    TimeoutResolved: produceUpdate((prev, next, callObj) => {
      next.timeouts = next.timeouts.filter(nc => nc === callObj)
      next.eventQueue.push({ ...callObj.fn, type: 'timeout callback' })
    }),
    AddToEventQueue: produceUpdate((prev, next, fn) => {
      next.eventQueue.push(fn)
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
