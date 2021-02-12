import * as React from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

type Props = Readonly<{
  className?: string
}>

export const UserIcon: React.FC<Props> = props => (
  <FontAwesomeIcon className={clsx(styles.userIcon, props.className)} icon={fasUserCircle} />
)
