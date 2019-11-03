import m from 'mithril'
import { multi, method } from '@arrows/multimethod'

import clockIcon from '../../res/timer.svg'
import networkIcon from '../../res/network.svg'
import refreshIcon from '../../res/refresh.svg'
import { twComponent } from '../util'

let HeadingStyle        = twComponent(' p-2 text-lg text-gray-700 ')
let AsyncCallListLayout = twComponent(' bg-white mb-8 ')
let AsyncCallContainer  = twComponent(' flex flex-row h-20 ')
let IconStyle           = twComponent('img', ' w-16 h-16 filter-invert animation-pulse ')
let AnimateSpeed       = { style: { animationDuration: "0.5s" } }
let NetCallIcon         = m(IconStyle, { ...AnimateSpeed, src: networkIcon })
let TimeoutIcon         = m(IconStyle, { ...AnimateSpeed, src: clockIcon })

const AsyncCallList = {
  view: ({ attrs: { states } }) => m(
    AsyncCallListLayout,
    m(HeadingStyle, 'Async Calls'),
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
  method('onclick',         () => ({ bg: 'bg-indigo-500', text: 'text-indigo-500' })),
  method('networkCallback', () => ({ bg: 'bg-green-500', text: 'text-green-500' })),
  method('timeoutCallback', () => ({ bg: 'bg-red-500', text: 'text-red-500' })),
)

let PendingFnWrapper  = twComponent(' h-20 w-20 m-1 p-1 ')

function PendingFn(fn) {
  let { bg, text } = colorByType(fn)
  return m(
    twComponent(PendingFnWrapper, bg),
    m(
      twComponent(` px-1 bg-white text-sm font-bold ${text} truncate `),
      fn.type,
    ),
  )
}

let EventQueueLayout  = twComponent(' bg-white mb-8 ')
let EventQueueWrapper = twComponent(' flex flex-row-reverse h-24 ')

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
      twComponent('img', ' w-16 h-16 filter-invert-75 '),
      { src: refreshIcon },
    ),
  }
}

let EventQueue = {
  view: ({ attrs: { states } }) => m(
    EventQueueLayout,
    m(HeadingStyle, 'Event Queue'),
    m(
      EventQueueWrapper,
      m(NextEventIcon, { states }),
      states().eventQueue.map(PendingFn),
    ),
  ),
}

let BrowserEngine = twComponent(' flex flex-col flex-grow-2 p-4 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    BrowserEngine,
    states().showBrowserEngine && m(twComponent('h2', ' mb-4 text-3xl '), 'Browser Engine'),
    m(AsyncCallList, { states, actions }),
    m(EventQueue, { states, actions }),
  ),
})
