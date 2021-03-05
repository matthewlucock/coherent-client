import { CustomError } from 'ts-custom-error'

import { SERVER_DOMAIN } from 'coherent/globals'
import { store, getState } from 'coherent/store'
import { apiActions } from 'coherent/store/slices/api'

export class ApiError extends CustomError {}

type HttpMethod = 'GET' | 'POST' | 'DELETE'
type Options = Readonly<{
  method?: HttpMethod
  params?: URLSearchParams
  data?: object
}>

const getQueryString = (params: URLSearchParams): string => {
  const queryString = params.toString()
  if (queryString.length > 0) return `?${queryString}`
  return ''
}

// Used for adding an artificial delay to requests for testing/observing loading behavior
const wait = async (delay: number): Promise<void> => (
  await new Promise(resolve => setTimeout(resolve, delay))
)

export const apiRequest = async (path: string, options?: Options): Promise<any> => {
  await wait(1000)

  const method = options?.method
  const params = options?.params
  const data = options?.data

  const state = getState()
  const { clientId } = state.api

  if (params !== undefined) path += getQueryString(params)

  const request = new Request(`http://${SERVER_DOMAIN}/${path}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Coherent-Client-Id': clientId
    },
    body: JSON.stringify(data)
  })

  let response: Response
  try {
    response = await fetch(request)
  } catch (error) {
    store.dispatch(apiActions.setNoConnection(true))
    throw new ApiError('No connection')
  }

  const responseText = await response.text()
  if (responseText.length === 0 && response.ok) return null

  let responseData: any
  try {
    responseData = JSON.parse(responseText)
  } catch (error) {
    console.error(`Could not parse JSON for request: ${path}`)
    throw error
  }

  if (!response.ok) throw new ApiError(responseData.message)
  return responseData
}
