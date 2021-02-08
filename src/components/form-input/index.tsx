import * as React from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './styles.scss'

import type { InputState } from 'coherent/globals'
import type { InputValidator } from 'coherent/api/input-validation'

type Props = Readonly<{
  type?: string
  value: string
  setValue: (value: string) => void
  label: string
  icon: IconProp
  state: InputState
  setState: (state: InputState) => void
  message: string
  setMessage: (message: string) => void
  inputValidator?: InputValidator
}>

export const FormInput: React.FC<Props> = props => {
  /**
   * Control
   */

  const input = React.useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = React.useState(false)

  const focus = (event: React.MouseEvent): void => {
    if (input.current === null || focused) return
    input.current.focus()
    event.preventDefault()
  }

  const onInput = (): void => {
    if (input.current === null) return

    const newValue = input.current.value
    props.setValue(newValue)

    props.setState(null)
    if (newValue.length === 0) return

    if (props.inputValidator === undefined) return
    const { state, message } = props.inputValidator(newValue)
    props.setState(state)
    if (message !== undefined) props.setMessage(message)
  }

  /**
   * Label
   */

  const [label, setLabel] = React.useState(props.label)
  const [labelState, setLabelState] = React.useState<InputState>(null)

  React.useEffect(() => {
    if (props.state === 'error') {
      setLabel(props.message)
      setLabelState('error')
    } else if (props.value.length > 0) {
      setLabel(props.label)
      setLabelState(props.state === 'complete' ? 'complete' : null)
    }
  }, [props.value, props.state])

  /**
   * Component
   */

  const containerClassName = clsx(
    styles.container,
    focused && styles.focused,
    props.state !== null && styles[props.state]
  )

  const labelClassName = clsx(
    styles.label,
    props.value.length > 0 && styles.nonEmpty,
    labelState !== null && styles[labelState]
  )

  return (
    <div className={containerClassName} onMouseDown={focus}>
      <div className={labelClassName}>{label}</div>

      <div className={styles.inputWrapper}>
        <FontAwesomeIcon className={styles.icon} icon={props.icon} />

        <input
          className={styles.baseInput}
          ref={input}
          type={props.type ?? 'text'}
          value={props.value}
          placeholder={props.label}
          onInput={onInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          spellCheck={false}
        />
      </div>
    </div>
  )
}
