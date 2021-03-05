import * as React from 'react'
import { Switch as RouterSwitch, useHistory } from 'react-router'

import themeStyles from './themes.scss'
import './main.scss'

import { LOGIN_ROUTE, SIGNUP_ROUTE, MAIN_ROUTE } from './globals'
import { forceReflowOnElement } from './util'
import { AuthenticatedRoute, UnauthenticatedRoute } from './util/routes'
import { useSelector } from './store'
import { isRequestCompleted } from './store/data'
import { getAuthenticated } from './store/slices/self'
import { fetchSelf } from './logic/self'
import { init } from './logic/init'

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

  const selfFetched = useSelector(({ self }) => self.fetch.requestState === 'succeeded')
  const initialized = useSelector(({ api }) => api.init.requestState === 'succeeded')
  const authenticated = useSelector(getAuthenticated)
  const loaded = useSelector(state => (
    state.api.previousInstance || (
      isRequestCompleted(state.self.fetch) &&
      (!getAuthenticated(state) || isRequestCompleted(state.api.init))
    )
  ))

  React.useEffect(() => {
    fetchSelf().catch(console.error)
  }, [])

  React.useEffect(() => {
    if (!selfFetched) return

    if (authenticated) {
      history.push(MAIN_ROUTE)
      init().catch(console.error)
    } else {
      history.push(LOGIN_ROUTE)
    }
  }, [selfFetched, authenticated])

  if (!loaded) return <Loading />
  return (
    <RouterSwitch>
      <UnauthenticatedRoute path={[LOGIN_ROUTE, SIGNUP_ROUTE]}>
        <Auth />
      </UnauthenticatedRoute>

      <AuthenticatedRoute path={MAIN_ROUTE}>
        {initialized && <Main />}
      </AuthenticatedRoute>
    </RouterSwitch>
  )
}
