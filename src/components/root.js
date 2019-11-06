import m from 'mithril'

import { tw } from '../util'
import BrowserEngine from './browserEngine'
import UserSpace from './userSpace'
import SimulationOptions from './simulationOptions'

let AppLayout = tw(' h-full flex flex-col bg-orange-100 font-sans ')
let SimulationLayout = tw(' h-full flex flex-row bg-orange-100 ')

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
