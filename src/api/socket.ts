import { getState, dispatch } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'
import { participantTyping } from 'coherent/logic/typing'

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

  private baseSend (data: unknown): void {
    this.rawSocket!.send(JSON.stringify(data))
  }

  public send (type: string, data: unknown): void {
    this.baseSend({ type, data })
  }

  private ping (): void {
    this.baseSend(PING)
  }

  private onOpen (): void {
    this.rawSocket!.onerror = null
    this.ping()
    this.pingIntervalId = window.setInterval(() => this.ping(), PING_INTERVAL)
  }

  private handleMessage (rawMessage: any): void {
    const message: SocketMessage = JSON.parse(rawMessage)

    if (message.type === 'message') {
      const { chatId, ...rest } = message.data
      dispatch(chatsActions.saveMessage({ chatId, message: rest }))
    }

    if (message.type === 'typing') {
      const { chatId, userId } = message.data
      participantTyping({ chatId, userId })
    }
  }

  public async connect (): Promise<void> {
    return await new Promise((resolve, reject) => {
      const socketUrl = new URL(SOCKET_URL)
      socketUrl.searchParams.set('clientId', getState().api.clientId)

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
