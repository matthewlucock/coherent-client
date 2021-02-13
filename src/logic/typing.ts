import { getState, dispatch } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'
import { socket } from 'coherent/api/socket'

export const selfTyping = (chatId: string): void => {
  const state = getState()
  const { lastSelfTypingTime } = state.chats.chats[chatId].typing

  const now = Date.now()
  if (now - lastSelfTypingTime < 1000) return

  dispatch(chatsActions.setSelfTypingTime({ chatId, time: now }))
  socket.send('typing', chatId)
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
    dispatch(chatsActions.setParticipantStoppedTyping({ chatId, userId }))
    typingTimeouts.get(chatId)?.delete(userId)
  }, TYPING_TIMEOUT_DURATION)

  typingTimeouts.get(chatId)?.set(userId, timeoutId)
}
export const participantTyping = ({ chatId, userId }: ParticipantTypingArgs): void => {
  if (!typingTimeouts.has(chatId)) typingTimeouts.set(chatId, new Map())
  const timeoutId = typingTimeouts.get(chatId)?.get(userId)

  if (timeoutId === undefined) {
    dispatch(chatsActions.setParticipantTyping({ chatId, userId }))
  } else {
    window.clearTimeout(timeoutId)
  }

  setParticipantTypingTimeout({ chatId, userId })
}
