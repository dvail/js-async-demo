
import m from 'mithril'

import { twComponent } from '../util'

let AsyncCallListStyle = twComponent(' bg-white ')
let Heading = twComponent(' text-lg ')
let Container = twComponent(' flex flex-row ')
let NetCall = twComponent(' w-20 h-20 bg-green-700 ')
let Timeout = twComponent(' w-20 h-20 bg-orange-500 ')

const AsyncCallList = {
  view: ({ attrs: { states } }) => m(
    AsyncCallListStyle,
    m(Heading, 'Async Calls'),
    m(
      Container,
      states().networkCalls.map(nc => m(NetCall)),
      states().timeouts.map(to => m(Timeout)),
    ),
  ),
}

let EventQueueStyle = twComponent(' bg-white ')
let EventQueueHeading = twComponent(' text-lg ')
let EventQueueLayout = twComponent('  flex flex-row-reverse ')

let PendingFn = twComponent(' h-20 w-20 bg-blue-900 ')

const EventQueue = {
  view: ({ attrs: { states } }) => m(
    EventQueueStyle,
    m(EventQueueHeading, 'Event Queue'),
    m(
      EventQueueLayout,
      states().eventQueue.map(fn => m(PendingFn)),
    ),
  ),
}

let BrowserEngine = twComponent(' flex flex-col flex-grow-2 p-4 bg-red-100 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    BrowserEngine,
    m('h2', 'Browser Engine'),
    m(AsyncCallList, { states, actions }),
    m(EventQueue, { states, actions }),
  ),
})
