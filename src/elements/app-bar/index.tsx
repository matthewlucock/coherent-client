import * as React from 'react'

import styles from './styles.scss'

import { UserMenu } from 'coherent/elements/user-menu'
import { Friends } from 'coherent/elements/friends'
import { Title } from './title'
import { Logo } from 'coherent/components/logo'

export const AppBar: React.FC = () => (
  <div className={styles.container}>
    <Logo className={styles.logo} />

    <div className={styles.group}>
      <UserMenu />
      <Friends />
    </div>

    <Title />
  </div>
)
