import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import styles from './styles.scss'

import { LOGIN_ROUTE, SIGNUP_ROUTE } from 'coherent/routes'

import { Login } from './login'
import { Signup } from './signup'
import { Logo } from 'coherent/components/logo'

export const Auth: React.FC = () => (
  <div className={styles.container}>
    <Logo className={styles.heading} />

    <Switch>
      <Route path={LOGIN_ROUTE} component={Login} />
      <Route path={SIGNUP_ROUTE} component={Signup} />
    </Switch>
  </div>
)
