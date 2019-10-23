import m from 'mithril'

import { twComponent } from '../util'

let ThreadContainer  = twComponent(' flex flex-col-reverse bg-red-200 h-full w-20 mx-2 ')
let ThreadStyle      = twComponent(' border border-solid border-red-900 text-xs transition-opacity transition-ease opacity-0 ')
let LineStyle        = twComponent(' m-1 rounded text-white ')
let DoneLineStyle    = twComponent(LineStyle, ' bg-blue-900 font-bold ')
let PendingLineStyle = twComponent(LineStyle, ' bg-gray-500 ')

let ThreadStack = () => ({
  oncreate: vnode => {
    window.requestAnimationFrame(() => vnode.dom.classList.add('opacity-100'))
  },
  view: ({ attrs: { fn } }) => m(
    ThreadStyle,
    fn.lines.map(l => (l.done ? m(DoneLineStyle, l.type) : m(PendingLineStyle, l.type))),
  ),
})

export default () => ({
  view: ({ attrs: { model } }) => m(
    ThreadContainer,
    model.callstack.map(fn => m(ThreadStack, { fn })),
  ),
})
