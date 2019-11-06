import m from 'mithril'
import { range } from 'lodash'

import { tw } from '../util'

function ThreadHelix() {
  let Point = tw(`
    relative h-2 w-2 mb-2 m-auto
    bg-red-500 rounded-full
    opacity-50
    animation-helix animation-circular
    animation-1s
  `)

  let view = () => {
    return m(
      tw('absolute m-auto w-full text-center'),
      range(100).map(n => m(
        Point,
        { style: `animation-delay: -${n * 150}ms` },
      )),
    )
  }

  return { view }
}

function ThreadStack({ attrs: { model } }) {
  let LineStyle        = tw(' m-1 px-2 rounded ')
  let DoneLineStyle    = tw(LineStyle, ' bg-white font-bold ')
  let PendingLineStyle = tw(LineStyle, ' bg-white opacity-50 ')
  let ThreadStyle      = tw(' z-10 text-xs transition-opacity opacity-0 ')

  let CallClassColors = {
    onclick: 'bg-indigo-500 text-indigo-500',
    networkCallback: 'bg-green-500 text-green-500',
    timeoutCallback: 'bg-red-500 text-red-500',
  }

  let { callOriginator } = model
  let callClassColor = CallClassColors[callOriginator] || 'bg-gray-400'

  let oncreate = vnode => {
    window.requestAnimationFrame(() => vnode.dom.classList.add('opacity-100'))
  }

  let onbeforeremove = vnode => {
    vnode.dom.classList.remove('opacity-100')
    return new Promise(resolve => {
      vnode.dom.addEventListener("transitionend", resolve)
    })
  }

  let view = ({ attrs: { fn } }) => m(
    ThreadStyle,
    { class: callClassColor },
    fn.lines.map(l => (l.done ? m(DoneLineStyle, l.type) : m(PendingLineStyle, l.type))),
  )

  return { oncreate, onbeforeremove, view }
}


export default function Thread() {
  let ThreadContainer  = tw(' overflow-hidden relative flex flex-col-reverse h-full w-20 mx-2 ')

  let view = ({ attrs: { model } }) => m(
    ThreadContainer,
    m(ThreadHelix),
    model.callstack.map(fn => m(ThreadStack, { model, fn })),
  )
  return { view }
}
