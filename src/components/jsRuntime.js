import m from 'mithril'

import { twComponent } from '../util'

import Thread from './thread'

let JsRuntime = twComponent(' flex flex-col bg-white flex-grow ')
let Heading = twComponent(' text-lg ')

export default () => ({
  view: ({ attrs: { states } }) => m(
    JsRuntime,
    m(Heading, 'JS Runtime'),
    m(
      twComponent(' flex flex-row flex-grow py-2 mx-1 '),
      states().threads.map(t => m(Thread, { model: t })),
    ),
  ),
})
