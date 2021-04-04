import * as React from 'react'

import styles from './styles.scss'

import type { InputState } from 'coherent/globals'
import { handlePromiseRejection } from 'coherent/util'
import { useSelector } from 'coherent/store'
import { onboardingDisplayName } from 'coherent/logic/self'

import { Form } from 'coherent/components/form'
import { FormInput } from 'coherent/components/form-input'

export const OnboardingDisplayName: React.FC = () => {
  const requestState = useSelector(({ self }) => self.onboardingDisplayName.requestState)
  const errorMessage = useSelector(({ self }) => self.onboardingDisplayName.errorMessage)

  const [value, setValue] = React.useState('')
  const [inputState, setInputState] = React.useState<InputState>(null)
  const [message, setMessage] = React.useState('')

  const onSubmit = (): void => {
    if (value.length === 0) {
      setInputState('error')
      setMessage('Display name required')
      return
    }

    handlePromiseRejection(onboardingDisplayName(value))
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Set display name</div>

      <Form
        buttonLabel='Submit'
        onSubmit={onSubmit}
        pending={requestState === 'pending'}
        errored={false}
        errorMessage={errorMessage}
      >
        <FormInput
          value={value}
          setValue={setValue}
          label='Display name'
          state={inputState}
          setState={setInputState}
          message={message}
          setMessage={setMessage}
        />
      </Form>
    </div>
  )
}
