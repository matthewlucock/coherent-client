import * as React from 'react'

import { UserMenu } from 'coherent/elements/user-menu'
import { Friends } from 'coherent/elements/friends'
import { Logo } from 'coherent/components/logo'

import styles from './styles.scss'

export const AppBar: React.FC = () => (
  <div className={styles.container}>
    <Logo className={styles.logo} />
    <div className={styles.group}>
      <UserMenu />
      <Friends />
    </div>
  </div>
)
