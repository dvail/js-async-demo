import m from 'mithril'

import { classes } from '../util'

let AsyncCallList = classes` uk-card uk-card-default `
let Heading = classes` .uk-card-heading `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    AsyncCallList,
    m(Heading, 'Async Calls'),
    m('.uk-card-body'),
  ),
})

