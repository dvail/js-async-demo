
import m from 'mithril'

import { twComponent } from '../util'

import AsyncCallList from './asyncCallList'
import EventQueue from './eventQueue'

let BrowserEngine = twComponent(' flex flex-col flex-grow-2 p-4 bg-red-100 ')

export default () => ({
  view: ({ attrs: { states, actions } }) => m(
    BrowserEngine,
    m('h2', 'Browser Engine'),
    m(AsyncCallList, { states, actions }),
    m(EventQueue, { states, actions }),
  ),
})
