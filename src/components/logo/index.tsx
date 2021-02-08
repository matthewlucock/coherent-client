import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  className?: string
}>

export const Logo: React.FC<Props> = props => (
  <div className={clsx(styles.logo, props.className)}>💬 Coherent</div>
)
