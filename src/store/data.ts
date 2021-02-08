type Requestable = Readonly<{
  requestState: 'pending' | 'succeeded' | 'failed' | null
  errorMessage: string
}>
export const REQUESTABLE: Requestable = {
  requestState: null,
  errorMessage: ''
}

export type BaseUser = Readonly<{
  id: string
  displayUsername: string
}>
