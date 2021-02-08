import * as React from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

type Props = Readonly<{
  username: string
  message: string
  selected: boolean
  select: () => void
}>

export const ChatCard: React.FC<Props> = props => (
  <div className={clsx(styles.container, props.selected && styles.selected)} onClick={props.select}>
    <div className={styles.card}>
      <FontAwesomeIcon className={styles.userImage} icon={fasUserCircle} />

      <div>
        <div className={styles.username}>{props.username}</div>
        <div className={styles.message}>{props.message}</div>
      </div>
    </div>
  </div>
)
