import { CustomError } from 'ts-custom-error'

import { wait } from 'coherent/util'
import { store } from 'coherent/store'

export class ApiError extends CustomError {}

type HttpMethod = 'GET' | 'POST' | 'DELETE'
type Options = Readonly<{
  method?: HttpMethod
  data?: object
}>

export const apiRequest = async (path: string, options?: Options): Promise<any> => {
  await wait(1000)

  const method = options?.method
  const data = options?.data

  const state = store.getState()
  const { clientId } = state.api

  const request = new Request(`http://localhost:${SERVER_PORT}/${path}`, {
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
    // store.dispatch(apiSlice.actions.noConnection())
    throw new ApiError('No connection')
  }

  const responseData = await response.json()
  if (!response.ok) throw new ApiError(responseData.message)
  return responseData
}

// temp
;(window as any).apiRequest = apiRequest