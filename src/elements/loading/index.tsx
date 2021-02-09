import * as React from 'react'

import { LoadingIndicator } from 'coherent/components/loading-indicator'
import { Logo } from 'coherent/components/logo'

import styles from './styles.scss'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <Logo />
    <LoadingIndicator className={styles.loadingIndicator} />
  </div>
)
