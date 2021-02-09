import * as React from 'react'

import { Logo } from 'coherent/components/logo'

import styles from './styles.scss'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <Logo />
    <div className={styles.loadingIndicator} />
  </div>
)
