import m from 'mithril'

import { twComponent } from '../util'

export default () => ({
  view: (vnode) => m(
    twComponent('button', ` px-10 py-2 `),
    {
      ...vnode.attrs,
    },
    vnode.children,
  ),
})
