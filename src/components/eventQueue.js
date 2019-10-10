import m from 'mithril'

import { classes } from '../util'

let EventQueue = classes` uk-card uk-card-default `
let Heading = classes` uk-card-heading `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    EventQueue,
    m(Heading, 'Event Queue'),
    m('.uk-card-body'),
  ),
})
