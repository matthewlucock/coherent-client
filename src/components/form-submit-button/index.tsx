import * as React from 'react'

import styles from './styles.scss'

import { StylizedButton } from 'coherent/components/stylized-button'
import { LoadingIndicator } from 'coherent/components/loading-indicator'

type Props = Readonly<{
  className?: string
  pending: boolean
  disabled: boolean
}>

export const FormSubmitButton: React.FC<Props> = props => (
  <StylizedButton
    type='submit'
    className={props.className}
    disabled={props.disabled || props.pending}
  >
    {props.pending ? <LoadingIndicator className={styles.loadingIndicator} /> : props.children}
  </StylizedButton>
)
