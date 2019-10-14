import m from 'mithril'

import { classes } from '../util'

let EventQueue = classes` uk-card uk-card-default `
let Heading = classes` uk-card-heading `
let EventQueueLayout = classes` uk-card-body flex flex-row-reverse `

let PendingFn = classes` h-20 w-20 bg-blue-900 `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    EventQueue,
    m(Heading, 'Event Queue'),
    m(
      EventQueueLayout,
      states().eventQueue.map(fn => m(PendingFn)),
    ),
  ),
})
