import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

import { UserIcon } from 'coherent/components/user-icon'

type Props = Readonly<{
  username: string
  message: string
  selected: boolean
  select: () => void
}>

export const ChatCard: React.FC<Props> = props => (
  <div className={clsx(styles.container, props.selected && styles.selected)} onClick={props.select}>
    <div className={styles.card}>
      <UserIcon className={styles.userIcon} />

      <div>
        <div className={styles.username}>{props.username}</div>
        <div className={styles.message}>{props.message}</div>
      </div>
    </div>
  </div>
)
