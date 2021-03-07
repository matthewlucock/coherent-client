import * as React from 'react'
import { Switch as RouterSwitch, useHistory } from 'react-router'

import themeStyles from './themes.scss'
import './main.scss'

import { AUTH_ROUTES, LOGIN_ROUTE, CORE_ROUTE } from './globals'
import { handlePromiseRejection, forceReflowOnElement } from './util'
import { AuthenticatedRoute, UnauthenticatedRoute } from './util/routes'
import { useSelector } from './store'
import { getBaseInitSucceeded, getAuthenticated, getShowLoading } from './store/selectors'
import { fetchSelf } from './logic/self'

import { Core } from './core'
import { Loading } from './elements/loading'
import { FatalNoConnection } from './elements/fatal-error'
import { Auth } from './elements/auth'

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

  const baseInitSucceeded = useSelector(getBaseInitSucceeded)
  const fetchSelfRequestState = useSelector(({ self }) => self.fetch.requestState)
  const authenticated = useSelector(getAuthenticated)
  const noConnection = useSelector(({ api }) => api.noConnection)
  const showLoading = useSelector(getShowLoading)

  React.useEffect(() => {
    handlePromiseRejection(fetchSelf())
  }, [])

  React.useEffect(() => {
    if (fetchSelfRequestState !== 'succeeded') return

    if (authenticated) {
      history.push(CORE_ROUTE)
    } else {
      history.push(LOGIN_ROUTE)
    }
  }, [fetchSelfRequestState, authenticated])

  if (fetchSelfRequestState === 'failed' && noConnection) return <FatalNoConnection />

  return (
    <>
      {showLoading && <Loading />}

      <RouterSwitch>
        <UnauthenticatedRoute path={AUTH_ROUTES}>
          {baseInitSucceeded && <Auth />}
        </UnauthenticatedRoute>

        <AuthenticatedRoute path={CORE_ROUTE}>
          <Core />
        </AuthenticatedRoute>
      </RouterSwitch>
    </>
  )
}
