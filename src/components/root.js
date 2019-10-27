import m from 'mithril'

import { twComponent } from '../util'
import BrowserEngine from './browserEngine'
import UserSpace from './userSpace'
import SimulationOptions from './simulationOptions'

let AppLayout = twComponent(' h-full flex flex-col bg-orange-100 ')
let SimulationLayout = twComponent(' h-full flex flex-row bg-orange-200 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    AppLayout,
    m(
      SimulationLayout,
      states().showBrowserEngine && m(BrowserEngine, { states, actions }),
      m(UserSpace, { states, actions }),
    ),
    m(SimulationOptions, { states, actions }),
  ),
})
