import m from 'mithril'

import { twComponent } from '../util'

let ThreadContainer = twComponent(' flex flex-col-reverse bg-red-200 h-full w-20 mx-2 ')
let ThreadStyle = twComponent(' border border-solid border-red-900 text-xs ')

let DoneLineStyle = twComponent(' m-1 rounded bg-blue-900 text-white font-bold ')
let LineStyle = twComponent(' m-1 rounded bg-gray-500 text-white ')

let Thread = () => ({
  view: ({ attrs: { fn } }) => m(
    ThreadStyle,
    fn.lines.map(l => (l.done ? m(DoneLineStyle, l.type) : m(LineStyle, l.type))),
  ),
})

export default () => ({
  view: ({ attrs: { model } }) => m(
    ThreadContainer,
    model.callstack.map(fn => m(Thread, { fn })),
  ),
})
