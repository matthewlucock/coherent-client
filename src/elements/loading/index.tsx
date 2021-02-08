import * as React from 'react'

import styles from './styles.scss'

import { Logo } from 'coherent/components/logo'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <Logo />
    <div className={styles.loadingIndicator} />
  </div>
)
