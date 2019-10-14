import m from 'mithril'

import { twComponent } from '../util'

let EventQueue = twComponent(' bg-white ')
let Heading = twComponent(' text-lg ')
let EventQueueLayout = twComponent('  flex flex-row-reverse ')

let PendingFn = twComponent(' h-20 w-20 bg-blue-900 ')

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
