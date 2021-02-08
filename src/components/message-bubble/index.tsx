import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  self: boolean
}>

export const MessageBubble: React.FC<Props> = props => {
  return (
    <div className={clsx(styles.bubble, props.self && styles.self)}>
      {props.children}
    </div>
  )
}
