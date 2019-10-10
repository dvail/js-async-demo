
import m from 'mithril'

import { classes } from '../util'

import AsyncCallList from './asyncCallList'
import EventQueue from './eventQueue'

let BrowserEngine = classes` flex flex-col flex-grow-2 p-4 bg-red-100 `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    BrowserEngine,
    m('h2', 'Browser Engine'),
    m(AsyncCallList),
    m(EventQueue),
  ),
})
