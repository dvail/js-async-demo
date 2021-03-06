import m from 'mithril'
import { multi, method } from '@arrows/multimethod'

import clockIcon from '../../res/timer.svg'
import networkIcon from '../../res/network.svg'
import refreshIcon from '../../res/refresh.svg'
import { tw } from '../util'

let HeadingStyle        = tw(' p-2 text-lg text-gray-700 ')
let AsyncCallListLayout = tw(' bg-white mb-8 ')
let AsyncCallContainer  = tw(' flex flex-row h-20 ')
let IconStyle           = tw('img', ' w-16 h-16 filter-invert animation-pulse ')
let AnimateSpeed        = { style: { animationDuration: "0.5s" } }
let AsyncCallWrapper    = tw(' p-2 animation-expand-up animation-once animation-200ms transform-b ')

let AsyncCall = ({ attrs: { iconSrc, bgColor } }) => ({
  onbeforeremove: vnode => {
    vnode.dom.classList.add('animation-collapse-down')
    return new Promise(resolve => {
      vnode.dom.addEventListener("animationend", resolve)
    })
  },
  view: () => m(
    tw(AsyncCallWrapper, bgColor),
    m(IconStyle, { ...AnimateSpeed, src: iconSrc }),
  ),
})

const AsyncCallList = {
  view: ({ attrs: { states } }) => m(
    AsyncCallListLayout,
    m(HeadingStyle, 'Async Calls'),
    m(
      AsyncCallContainer,
      states().networkCalls.map(() => m(
        AsyncCall,
        { iconSrc: networkIcon, bgColor: ' bg-green-500 ' },
      )),
      states().timeouts.map(() => m(
        AsyncCall,
        { iconSrc: clockIcon, bgColor: ' bg-red-500 ' },
      )),
    ),
  ),
}

function PendingFn() {
  let colorByType = multi(
    ({ type }) => type,
    method('onclick', () => ({ bg: 'bg-indigo-500', text: 'text-indigo-500' })),
    method('networkCallback', () => ({ bg: 'bg-green-500', text: 'text-green-500' })),
    method('timeoutCallback', () => ({ bg: 'bg-red-500', text: 'text-red-500' })),
  )

  let PendingFnWrapper = tw(` 
    h-20 w-20 m-1 p-1 
    transition-opacity opacity-0 opacity-100
    animation-expand-up animation-once animation-200ms transform-b
  `)

  let onbeforeremove = vnode => {
    vnode.dom.classList.remove('opacity-100')
    return new Promise(resolve => {
      vnode.dom.addEventListener("transitionend", resolve)
    })
  }

  let view = ({ attrs: { fn } }) => {
    let { bg, text } = colorByType(fn)
    return m(
      tw(PendingFnWrapper, bg),
      m(
        tw(` px-1 bg-white text-sm font-bold ${text} truncate `),
        fn.type,
      ),
    )
  }

  return { onbeforeremove, view }
}

let EventQueueLayout  = tw(' bg-white mb-8 ')
let EventQueueWrapper = tw(' flex flex-row-reverse h-24 ')

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
      tw('img', ' w-16 h-16 filter-invert-75 '),
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
      states().eventQueue.map(fn => m(PendingFn, { fn })),
    ),
  ),
}

let BrowserEngine = tw(' flex flex-col flex-grow-2 p-4 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    BrowserEngine,
    states().showBrowserEngine && m(tw('h2', ' mb-4 text-3xl '), 'Browser Engine'),
    m(AsyncCallList, { states, actions }),
    m(EventQueue, { states, actions }),
  ),
})
