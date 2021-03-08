import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

import { StylizedButton } from 'coherent/components/stylized-button'

type Props = Readonly<{
  buttonLabel: string
  onSubmit: () => void
  pending: boolean
  errored: boolean
  errorMessage: string
}>

export const Form: React.FC<Props> = props => {
  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    if (props.errored) return

    props.onSubmit()
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputsContainer}>
          {props.children}
        </div>

        <StylizedButton type='submit' pending={props.pending} disabled={props.errored}>
          {props.buttonLabel}
        </StylizedButton>
      </form>

      <div className={clsx(styles.errorMessage, props.errored && styles.visible)}>
        {props.children}
      </div>
    </div>
  )
}
