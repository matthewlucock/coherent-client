import * as React from 'react'
import { Switch, useHistory } from 'react-router'

import themeStyles from './themes.scss'
import './main.scss'

import { forceReflowOnElement } from './util'
import { useSelector } from './store'
import { getInitPending } from './store/api'
import { getAuthenticated } from './store/self'
import { baseInit, mainInit } from './logic/init'
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

const useTheme = (): void => {
  const darkTheme = useSelector(({ ui }) => ui.darkTheme)
  const initialized = React.useRef(false)

  const root = document.documentElement

  React.useEffect(() => {
    if (!initialized.current) return

    // The changingTheme class teporarily disables all CSS transitions, preventing them from firing
    // (flickering) when the theme changes.
    // Forcing a reflow makes one class change actually take effect before the next, which is
    // necessary for this to work.

    root.classList.add(themeStyles.changingTheme)
    forceReflowOnElement(root)
    root.classList.toggle(themeStyles.darkTheme, darkTheme)
    forceReflowOnElement(root)
    root.classList.remove(themeStyles.changingTheme)
  }, [darkTheme])

  React.useEffect(() => {
    initialized.current = true

    return () => {
      root.classList.remove(themeStyles.darkTheme, themeStyles.changingTheme)
    }
  }, [])
}

export const App: React.FC = () => {
  useTheme()
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
