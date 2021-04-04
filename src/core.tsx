import * as React from 'react'

import { handlePromiseRejection } from './util'
import { useSelector } from './store'
import { init } from './logic/init'

import { FatalNoConnection } from './elements/fatal-error'
import { OnboardingDisplayName } from './elements/onboarding/display-name'
import { Main } from './elements/main'

export const Core: React.FC = () => {
  const initRequestState = useSelector(({ api }) => api.init.requestState)
  const noConnection = useSelector(({ api }) => api.noConnection)
  const self = useSelector(({ self }) => self.data)

  const noDisplayName = self.displayName === ''
  const onboardingCompleted = !noDisplayName

  React.useEffect(() => {
    if (onboardingCompleted) handlePromiseRejection(init())
  }, [onboardingCompleted])

  if (initRequestState === 'failed' && noConnection) return <FatalNoConnection />
  if (noDisplayName) return <OnboardingDisplayName />
  if (initRequestState === 'succeeded') return <Main />

  return null
}
