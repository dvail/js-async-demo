import m from 'mithril'

import { classes } from '../util'
import BrowserEngine from './browserEngine'
import UserSpace from './userSpace'

let AppLayout = classes` h-full flex flex-col bg-orange-100 `
let SimulationLayout = classes` h-full flex flex-row bg-orange-200 `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    AppLayout,
    m(
      SimulationLayout,
      m(BrowserEngine),
      m(UserSpace),
    ),
    m('div', 'Simulation Options // TODO'),
  ),
})
