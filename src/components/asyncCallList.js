import m from 'mithril'

import { twComponent } from '../util'

let AsyncCallList = twComponent(' bg-white ')
let Heading = twComponent(' text-lg ')
let Container = twComponent(' flex flex-row ')
let NetCall = twComponent(' w-20 h-20 bg-green-700 ')
let Timeout = twComponent(' w-20 h-20 bg-orange-500 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    AsyncCallList,
    m(Heading, 'Async Calls'),
    m(
      Container,
      states().networkCalls.map(nc => m(NetCall)),
      states().timeouts.map(to => m(Timeout)),
    ),
  ),
})
