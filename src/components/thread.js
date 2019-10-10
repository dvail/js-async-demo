import m from 'mithril'

import { classes } from '../util'

let ThreadContainer = classes` bg-red-200 h-64 w-20 m-2 `

export default ({ attrs: { states, actions } }) => ({
  view: () => m(
    ThreadContainer,
  ),
})
