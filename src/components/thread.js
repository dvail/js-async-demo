import m from 'mithril'

import { twComponent } from '../util'

let ThreadContainer  = twComponent(' flex flex-col-reverse bg-red-200 h-full w-20 mx-2 ')
let ThreadStyle      = twComponent(' text-xs transition-opacity opacity-0 ')
let LineStyle        = twComponent(' m-1 px-2 rounded ')
let DoneLineStyle    = twComponent(LineStyle, ' bg-white font-bold ')
let PendingLineStyle = twComponent(LineStyle, ' bg-white opacity-50 ')

const CallClassColors = {
  onclick: 'bg-indigo-500 text-indigo-500',
  networkCallback: 'bg-green-500 text-green-500',
  timeoutCallback: 'bg-red-500 text-red-500',
}

let ThreadStack = ({ attrs: { model } }) => {
  let { callOriginator } = model
  let callClassColor = CallClassColors[callOriginator] || 'bg-gray-400'
  return {
    oncreate: vnode => {
      window.requestAnimationFrame(() => vnode.dom.classList.add('opacity-100'))
    },
    onbeforeremove: vnode => {
      vnode.dom.classList.remove('opacity-100')
      return new Promise(resolve => {
        vnode.dom.addEventListener("transitionend", resolve)
      });
    },
    view: ({ attrs: { fn } }) => m(
      ThreadStyle,
      { class: callClassColor },
      fn.lines.map(l => (l.done ? m(DoneLineStyle, l.type) : m(PendingLineStyle, l.type))),
    ),
  }
}

export default () => ({
  view: ({ attrs: { model } }) => m(
    ThreadContainer,
    model.callstack.map(fn => m(ThreadStack, { model, fn })),
  ),
})
