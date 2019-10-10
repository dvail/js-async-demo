import m from 'mithril'

import { classes } from '../util'

let JsRuntime = classes` uk-card uk-card-default flex-grow `
let Heading = classes` uk-card-heading `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    JsRuntime,
    m(Heading, 'JS Runtime'),
    m('.uk-card-body'),
  ),
})
