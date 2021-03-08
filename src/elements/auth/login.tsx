import * as React from 'react'
import { Link } from 'react-router-dom'
import { faUser as fasUser, faLock as fasLock } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { SIGNUP_ROUTE } from 'coherent/globals'
import type { InputState } from 'coherent/globals'
import { handlePromiseRejection } from 'coherent/util'
import { useSelector } from 'coherent/store'
import { login } from 'coherent/logic/auth'
import { usernameInputValidator } from 'coherent/logic/input-validation'

import { Form } from 'coherent/components/form'
import { FormInput } from 'coherent/components/form-input'

export const Login: React.FC = () => {
  const requestState = useSelector(({ auth }) => auth.login.requestState)
  const errorMessage = useSelector(({ auth }) => auth.login.errorMessage)

  const [username, setUsername] = React.useState('')
  const [usernameState, setUsernameState] = React.useState<InputState>(null)
  const [usernameMessage, setUsernameMessage] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordState, setPasswordState] = React.useState<InputState>(null)
  const [passwordMessage, setPasswordMessage] = React.useState('')

  let errored = [usernameState, passwordState].some(state => state === 'error')

  const onSubmit = (): void => {
    if (username.length === 0) {
      setUsernameState('error')
      setUsernameMessage('Username required')
      errored = true
    }

    if (password.length === 0) {
      setPasswordState('error')
      setPasswordMessage('Password required')
      errored = true
    }

    if (errored) return
    handlePromiseRejection(login({ username, password }))
  }

  return (
    <>
      <Form
        buttonLabel='Sign In'
        onSubmit={onSubmit}
        pending={requestState === 'pending'}
        errored={errored}
        errorMessage={errorMessage}
      >
        <FormInput
          value={username}
          setValue={setUsername}
          label='Username'
          icon={fasUser}
          state={usernameState === 'error' ? 'error' : null}
          setState={setUsernameState}
          message={usernameMessage}
          setMessage={setUsernameMessage}
          inputValidator={usernameInputValidator}
        />

        <FormInput
          type='password'
          value={password}
          setValue={setPassword}
          label='Password'
          icon={fasLock}
          state={passwordState === 'error' ? 'error' : null}
          setState={setPasswordState}
          message={passwordMessage}
          setMessage={setPasswordMessage}
          inputValidator={usernameInputValidator}
        />
      </Form>

      <Link className={styles.toggleLink} to={SIGNUP_ROUTE}>Not signed up?</Link>
    </>
  )
}
