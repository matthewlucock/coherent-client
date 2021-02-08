import * as React from 'react'

import styles from './styles.scss'

export const Menu: React.FC = props => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}
