import * as React from 'react'
import clsx from 'clsx'
import type { Padding as PopperPadding } from '@popperjs/core'
import { usePopper } from 'react-popper'

import styles from './styles.scss'

type Props = Readonly<{
  button: HTMLDivElement | null
  offset?: PopperPadding
  visible: boolean
}>

export const Menu: React.FC<Props> = props => {
  const [menu, setMenu] = React.useState<HTMLDivElement | null>(null)
  const [arrow, setArrow] = React.useState<HTMLDivElement | null>(null)
  const { styles: popperStyles } = usePopper(props.button, menu, {
    modifiers: [
      { name: 'arrow', options: { element: arrow } },
      { name: 'preventOverflow', options: { padding: props.offset } }
    ]
  })

  return (
    <div
      ref={setMenu}
      className={clsx(styles.menu, props.visible && styles.visible)}
      style={popperStyles.popper}
    >
      <div ref={setArrow} className={styles.arrow} style={popperStyles.arrow} />
      {props.children}
    </div>
  )
}
