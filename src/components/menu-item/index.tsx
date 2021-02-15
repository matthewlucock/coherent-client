import * as React from 'react'
import clsx from 'clsx'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './styles.scss'

type Props = Readonly<{
  className?: string
  icon?: IconProp
  onClick?: () => void
}>

export const MenuItem: React.FC<Props> = props => (
  <div className={clsx(styles.menuItem, props.className)} onClick={props.onClick}>
    {props.icon !== undefined && (
      <FontAwesomeIcon className={styles.icon} icon={props.icon} />
    )}
    {props.children}
  </div>
)
