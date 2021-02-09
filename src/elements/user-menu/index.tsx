import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons'

import { Menu } from 'coherent/components/menu'

import styles from './styles.scss'

export const UserMenu: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={fasUserCircle} />
      </div>

      <Menu>xxx</Menu>
    </div>
  )
}
