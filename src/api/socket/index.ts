import { SERVER_DOMAIN } from 'coherent/globals'
import { getState } from 'coherent/store'

import { handleSocketMessage } from './message'
import type { SocketMessage } from './message'

const PING_INTERVAL = 10 * 1000

class Socket {
  private rawSocket: WebSocket | null = null
  private pingIntervalId: number = 0

  public send (message: SocketMessage): void {
    this.rawSocket!.send(JSON.stringify(message))
  }

  private ping (): void {
    this.send({ type: 'ping' })
  }

  private onOpen (): void {
    this.rawSocket!.onerror = null
    this.ping()
    this.pingIntervalId = window.setInterval(() => this.ping(), PING_INTERVAL)
  }

  private onMessage (rawMessage: any): void {
    if (typeof rawMessage !== 'string') {
      // eslint-disable-next-line no-console
      console.error('Binary socket message')
      return
    }

    const message: SocketMessage = JSON.parse(rawMessage)
    handleSocketMessage(message)
  }

  public async connect (): Promise<void> {
    return await new Promise((resolve, reject) => {
      const socketUrl = new URL(`ws://${SERVER_DOMAIN}`)
      socketUrl.searchParams.set('clientId', getState().api.clientId)

      this.rawSocket = new WebSocket(socketUrl.toString())

      this.rawSocket.onopen = (): void => {
        this.onOpen()
        resolve()
      }
      this.rawSocket.onmessage = ({ data }) => this.onMessage(data)
      this.rawSocket.onerror = reject
    })
  }
}

export const socket = new Socket()
