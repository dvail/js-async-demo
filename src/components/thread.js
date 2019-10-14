import m from 'mithril'

import { classes } from '../util'

let ThreadContainer = classes` flex flex-col-reverse bg-red-200 h-64 w-20 m-2 `
let ThreadStyle = classes` border border-solid border-red-900 text-xs `

let Thread = () => ({
  view: ({ attrs: { fn } }) => m(
    ThreadStyle,
    JSON.stringify(fn.lines),
  ),
})

export default () => ({
  view: ({ attrs: { model } }) => m(
    ThreadContainer,
    model.callstack.map(fn => m(Thread, { fn })),
  ),
})
