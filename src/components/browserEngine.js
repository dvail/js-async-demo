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
        twComponent(' p-2 bg-green-500 '),
        NetCallIcon,
      )),
      states().timeouts.map(() => m(
        twComponent(' p-2 bg-red-500 '),
        TimeoutIcon,
      )),
    ),
  ),
}

const colorByType = multi(
  ({ type }) => type,
  method('onclick',          () => 'bg-indigo-500'),
  method('networkCallback',     () => 'bg-green-500'),
  method('timeoutCallback', () => 'bg-red-500'),
)

let PendingFnWrapper  = twComponent(' h-20 w-20 ')

function PendingFn(fn) {
  let color = colorByType(fn)
  return m(
    twComponent(PendingFnWrapper, color),
    m('.text-white', fn.type),
  )
}

let EventQueueLayout  = twComponent(' bg-white ')
let EventQueueHeading = twComponent(' text-lg ')
let EventQueueWrapper = twComponent(' flex flex-row-reverse ')

function NextEventIcon({ attrs: { states } }) {
  let transitionClasses = [
    'rotate-180',
    'transition-transform',
    'transition-500',
  ]
  let queueLength = states().eventQueue.length
  return {
    oncreate: vnode => {
      vnode.dom.addEventListener("transitionend", () => {
        vnode.dom.classList.remove(...transitionClasses)
      })
    },
    onupdate: (vnode) => {
      let nextQueueLength = vnode.attrs.states().eventQueue.length

      if (nextQueueLength < queueLength) {
        vnode.dom.classList.add(...transitionClasses)
      }
      queueLength = nextQueueLength
    },
    view: ({ attrs: { states } }) => m(
      twComponent('img', ' w-16 h-16 filter-invert-50 '),
      { src: refreshIcon },
    ),
  }
}

let EventQueue = {
  view: ({ attrs: { states } }) => m(
    EventQueueLayout,
    m(EventQueueHeading, 'Event Queue'),
    m(
      EventQueueWrapper,
      m(NextEventIcon, { states }),
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
