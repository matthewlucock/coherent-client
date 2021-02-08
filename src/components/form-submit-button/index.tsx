import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<{
  className?: string
  pending: boolean
  disabled: boolean
}>

export const FormSubmitButton: React.FC<Props> = props => (
  <button
    type='submit'
    className={clsx(styles.submitButton, props.className)}
    disabled={props.disabled || props.pending}
  >
    {props.pending ? <div className={styles.loadingIndicator} /> : props.children}
  </button>
)
