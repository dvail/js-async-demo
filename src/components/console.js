
import m from 'mithril'

import { twComponent } from '../util'

let Console = twComponent(' bg-white flex-grow ')
let Heading = twComponent(' text-lg ')

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    Console,
    m(Heading, 'Console'),
    m('div'),
  ),
})
