import type { State } from './'
import { isRequestCompleted } from './data'

export const getAuthenticated = ({ self }: State): boolean => self.data.id !== ''

export const getBaseInitSucceeded = (state: State): boolean => (
  state.self.fetch.requestState === 'succeeded' || state.api.previousInstance
)

export const getOnboardingCompleted = (state: State): boolean => (
  state.self.data.displayName !== ''
)

export const getShowLoading = (state: State): boolean => (
  !(state.api.previousInstance && state.self.fetch.requestState === null) && (
    !isRequestCompleted(state.self.fetch) ||
    (
      getAuthenticated(state) &&
      getOnboardingCompleted(state) &&
      !isRequestCompleted(state.api.init)
    ) ||
    state.auth.logout.requestState === 'pending'
  )
)
