import * as React from 'react'

import { handlePromiseRejection } from './util'
import { useSelector } from './store'
import { init } from './logic/init'

import { FatalNoConnection } from './elements/fatal-error'
import { Main } from './elements/main'

export const Core: React.FC = () => {
  const initRequestState = useSelector(({ api }) => api.init.requestState)
  const noConnection = useSelector(({ api }) => api.noConnection)

  React.useEffect(() => {
    handlePromiseRejection(init())
  }, [])

  if (initRequestState === 'failed' && noConnection) return <FatalNoConnection />
  if (initRequestState === 'succeeded') return <Main />

  return null
}
