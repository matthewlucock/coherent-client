import * as React from 'react'
import { Switch, useHistory } from 'react-router'

import { useSelector } from './store'
import { getInitPending } from './store/api'
import { getAuthenticated } from './store/self'
import { baseInit, mainInit } from './api/init'
import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  MAIN_ROUTE
} from './routes'

import { Loading } from './elements/loading'
import { Auth } from './elements/auth'
import { Main } from './elements/main'

export const App: React.FC = () => {
  const history = useHistory()

  const initPending = useSelector(getInitPending)
  const baseInitialized = useSelector(({ api }) => api.baseInit.requestState === 'succeeded')
  const mainInitialized = useSelector(({ api }) => api.mainInit.requestState === 'succeeded')
  const authenticated = useSelector(getAuthenticated)

  React.useEffect(() => {
    baseInit().catch(console.error)
  }, [])

  React.useEffect(() => {
    if (!baseInitialized) return

    if (authenticated) {
      history.push(MAIN_ROUTE)
      mainInit().catch(console.error)
    } else {
      history.push(LOGIN_ROUTE)
    }
  }, [baseInitialized, authenticated])

  return (
    <>
      {initPending && <Loading />}
      {baseInitialized && (
        <Switch>
          <UnauthenticatedRoute path={[LOGIN_ROUTE, SIGNUP_ROUTE]}>
            <Auth />
          </UnauthenticatedRoute>

          <AuthenticatedRoute path={MAIN_ROUTE}>
            {mainInitialized && <Main />}
          </AuthenticatedRoute>
        </Switch>
      )}
    </>
  )
}
