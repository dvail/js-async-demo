
import m from 'mithril'

import { twComponent } from '../util'

let AsyncCallListLayout = twComponent(' bg-white ')
let AsyncCallHeading    = twComponent(' text-lg ')
let AsyncCallContainer  = twComponent(' flex flex-row ')
let NetCall             = twComponent(' w-20 h-20 bg-green-700 ')
let Timeout             = twComponent(' w-20 h-20 bg-orange-500 ')

const AsyncCallList = {
  view: ({ attrs: { states } }) => m(
    AsyncCallListLayout,
    m(AsyncCallHeading, 'Async Calls'),
    m(
      AsyncCallContainer,
      states().networkCalls.map(nc => m(NetCall)),
      states().timeouts.map(to => m(Timeout)),
    ),
  ),
}

let EventQueueLayout  = twComponent(' bg-white ')
let EventQueueHeading = twComponent(' text-lg ')
let EventQueueWrapper = twComponent(' flex flex-row-reverse ')
let PendingFn         = twComponent(' h-20 w-20 bg-blue-900 ')

const EventQueue = {
  view: ({ attrs: { states } }) => m(
    EventQueueLayout,
    m(EventQueueHeading, 'Event Queue'),
    m(
      EventQueueWrapper,
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
