
import m from 'mithril'

import { classes } from '../util'

let Console = classes` uk-card uk-card-default flex-grow `
let Heading = classes` uk-card-heading `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    Console,
    m(Heading, 'Console'),
    m('.uk-card-body'),
  ),
})
