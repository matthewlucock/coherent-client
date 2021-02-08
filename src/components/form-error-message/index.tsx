import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  errored: boolean
}>

export const FormErrorMessage: React.FC<Props> = props => (
  <div className={clsx(styles.errorMessage, props.errored && styles.visible)}>
    {props.children}
  </div>
)
