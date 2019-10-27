import m from 'mithril'
import { multi, method } from '@arrows/multimethod'

import clockIcon from '../../res/timer.svg'
import networkIcon from '../../res/network.svg'
import refreshIcon from '../../res/refresh.svg'
import { twComponent } from '../util'

let AsyncCallListLayout = twComponent(' bg-white ')
let AsyncCallHeading    = twComponent(' text-lg ')
let AsyncCallContainer  = twComponent(' flex flex-row ')
let NetCallIcon         = m(twComponent('img', ' w-16 h-16 filter-invert '), { src: networkIcon })
let TimeoutIcon         = m(twComponent('img', ' w-16 h-16 filter-invert '), { src: clockIcon })

const AsyncCallList = {
  view: ({ attrs: { states } }) => m(
    AsyncCallListLayout,
    m(AsyncCallHeading, 'Async Calls'),
    m(
      AsyncCallContainer,
      states().networkCalls.map(() => m(
        twComponent(' p-2 bg-green-400 '),
        NetCallIcon,
      )),
      states().timeouts.map(() => m(
        twComponent(' p-2 bg-orange-400 '),
        TimeoutIcon,
      )),
    ),
  ),
}

let EventQueueLayout  = twComponent(' bg-white ')
let EventQueueHeading = twComponent(' text-lg ')
let EventQueueWrapper = twComponent(' flex flex-row-reverse ')
let PendingFnWrapper  = twComponent(' h-20 w-20 ')

const colorByType = multi(
  ({ type }) => type,
  method('onclick',          () => 'bg-blue-400'),
  method('net callback',     () => 'bg-green-400'),
  method('timeout callback', () => 'bg-orange-400'),
)

function PendingFn(fn) {
  let color = colorByType(fn)
  return m(
    twComponent(PendingFnWrapper, color),
    m('.text-white', fn.type),
  )
}

const EventQueue = {
  view: ({ attrs: { states } }) => m(
    EventQueueLayout,
    m(EventQueueHeading, 'Event Queue'),
    m(
      EventQueueWrapper,
      states().eventQueue.map(PendingFn),
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
