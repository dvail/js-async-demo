import stream from 'mithril/stream'
import produce from 'immer'
import _ from 'lodash'
import { multi, method } from '@arrows/multimethod'

import { SampleFunctions } from './syntheticFns'

export function ThreadModel(fn) {
  return {
    id: _.uniqueId('thread-'),
    callstack: fn ? [fn] : [],
  }
}

export function CpuModel(thread, activeTime) {
  return {
    id: _.uniqueId('cpu-'),
    thread,
    activeTime,
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
    SetTimeoutDelay: produceUpdate((prev, next, delay) => {
      next.timeoutDelay = delay
    }),
    SetThreadCount: produceUpdate((prev, next, count) => {
      while (next.threads.length > count) {
        next.threads.shift()
      }

      while (next.threads.length < count) {
        next.threads.push(ThreadModel())
      }
    }),
    SetCpuCount: produceUpdate((prev, next, count) => {
      while (next.cpus.length > count) {
        next.cpus.shift()
      }

      while (next.cpus.length < count) {
        next.cpus.push(CpuModel())
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
      let activeThreadIds = next.cpus.map(c => c.thread?.id)
      next.threads
        .filter(t => activeThreadIds.includes(t.id))
        .forEach(thread => {
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

      next.cpus.forEach(cpu => {
        if (
          cpu.thread ?.callstack
            .flatMap(cs => cs.lines)
            .every(l => l.done)
        ) {
          cpu.thread = null
        }
      })
    }),
    ChangeCpuThread: produceUpdate((prev, next, { cpu, thread }) => {
      let nextCpu = next.cpus.find(c => c.id === cpu.id)
      let nextThread = next.threads.find(t => t.id === thread.id)
      nextCpu.thread = nextThread
      nextCpu.activeTime = Date.now()
    }),
  }

  return {
    states,
    actions,
  }
}
