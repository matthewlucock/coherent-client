import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  visible: boolean
}>

export const Menu: React.FC<Props> = props => (
  <div className={clsx(styles.container, props.visible && styles.visible)}>
    {props.children}
  </div>
)
