type Requestable = Readonly<{
  requestState: 'pending' | 'succeeded' | 'failed' | null
  errorMessage: string
}>
export const REQUESTABLE: Requestable = {
  requestState: null,
  errorMessage: ''
}
export const isRequestCompleted = (requestable: Requestable): boolean => (
  requestable.requestState === 'succeeded' || requestable.requestState === 'failed'
)

export type BaseUser = Readonly<{
  id: string
  displayUsername: string
}>
