import m from 'mithril'

import { classes } from '../util'

import Thread from './thread'

let JsRuntime = classes` uk-card uk-card-default flex-grow `
let Heading = classes` uk-card-heading `

export default () => ({
  view: ({ attrs: { states } }) => m(
    JsRuntime,
    m(Heading, 'JS Runtime'),
    m(
      '.uk-card-body',
      states().threads.map(t => m(Thread, { model: t })),
    ),
  ),
})
