import { getState, dispatch } from 'coherent/store'
import { chatActions } from 'coherent/store/slices/chats'
import { socket } from 'coherent/api/socket'

export const selfTyping = (chatId: string): void => {
  const state = getState()
  const chat = state.chats[chatId]

  const now = Date.now()
  if (now - chat.typing.lastSelfTypingTime < 1000) return

  dispatch(chatActions.setSelfTypingTime({ chatId, time: now }))
  socket.send({ type: 'typing', data: chatId })
}

const TYPING_TIMEOUT_DURATION = 2000
const typingTimeouts = new Map<string, Map<string, number>>()
export const clearTypingTimeouts = (): void => {
  for (const chatTimeouts of typingTimeouts.values()) chatTimeouts.forEach(window.clearTimeout)
  typingTimeouts.clear()
}

type ParticipantTypingArgs = Readonly<{
  chatId: string
  userId: string
}>

const setParticipantTypingTimeout = ({ chatId, userId }: ParticipantTypingArgs): void => {
  const timeoutId = window.setTimeout((): void => {
    dispatch(chatActions.setParticipantStoppedTyping({ chatId, userId }))
    typingTimeouts.get(chatId)?.delete(userId)
  }, TYPING_TIMEOUT_DURATION)

  typingTimeouts.get(chatId)?.set(userId, timeoutId)
}
export const participantTyping = ({ chatId, userId }: ParticipantTypingArgs): void => {
  if (!typingTimeouts.has(chatId)) typingTimeouts.set(chatId, new Map())
  const timeoutId = typingTimeouts.get(chatId)?.get(userId)

  if (timeoutId === undefined) {
    dispatch(chatActions.setParticipantTyping({ chatId, userId }))
  } else {
    window.clearTimeout(timeoutId)
  }

  setParticipantTypingTimeout({ chatId, userId })
}
