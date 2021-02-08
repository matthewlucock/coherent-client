import { store } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'

const SOCKET_URL = 'ws://localhost:8081'

const PING = 'ping'
const PING_INTERVAL = 10 * 1000

type SocketMessage = Readonly<{
  type: string
  data: any
}>

class Socket {
  private rawSocket: WebSocket | null = null
  private pingIntervalId: number = 0

  private send (data: any): void {
    this.rawSocket!.send(JSON.stringify(data))
  }

  private ping (): void {
    this.send(PING)
  }

  private onOpen (): void {
    this.rawSocket!.onerror = null
    this.ping()
    this.pingIntervalId = window.setInterval(() => this.ping(), PING_INTERVAL)
  }

  private handleMessage (rawMessage: any): void {
    const message: SocketMessage = JSON.parse(rawMessage)

    if (message.type === 'message') {
      store.dispatch(chatsActions.saveMessage(message.data))
    }
  }

  public async connect (): Promise<void> {
    return await new Promise((resolve, reject) => {
      const socketUrl = new URL(SOCKET_URL)
      socketUrl.searchParams.set('clientId', store.getState().api.clientId)

      this.rawSocket = new WebSocket(socketUrl.toString())

      this.rawSocket.onopen = (): void => {
        this.onOpen()
        resolve()
      }
      this.rawSocket.onmessage = ({ data }) => this.handleMessage(data)
      this.rawSocket.onerror = reject
    })
  }
}

export const socket = new Socket()
