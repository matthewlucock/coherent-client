import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

import { LoadingIndicator } from 'coherent/components/loading-indicator'

type Props = Readonly<{
  className?: string
  type?: JSX.IntrinsicElements['button']['type']
  pending?: boolean
  disabled?: boolean
  onClick?: () => void
}>

export const StylizedButton: React.FC<Props> = props => (
  <button
    className={clsx(styles.button, props.className)}
    type={props.type}
    disabled={props.pending === true || props.disabled === true}
    onClick={props.onClick}
  >
    {props.pending === true
      ? <LoadingIndicator className={styles.loadingIndicator} />
      : props.children
    }
  </button>
)
