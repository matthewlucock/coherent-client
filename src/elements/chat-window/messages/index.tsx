import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'
import type { BaseMessage, OfficialMessage } from 'coherent/store/chats'
import { isMessageOfficial } from 'coherent/store/chats'

import { MessageBubble } from 'coherent/components/message-bubble'

const getMessageSortTime = (message: BaseMessage): number => (
  isMessageOfficial(message) && message.timeSent !== undefined ? message.timeSent : message.time
)
const getMessageList = (
  messages: readonly OfficialMessage[],
  queue: readonly BaseMessage[]
): readonly BaseMessage[] => {
  if (messages.length === 0 || queue.length === 0) return messages

  const list = [...queue, ...messages]
  if (getMessageSortTime(queue[queue.length - 1]) > getMessageSortTime(messages[0])) return list

  return list.sort((x, y) => getMessageSortTime(y) - getMessageSortTime(x))
}

type Props = Readonly<{
  chatId: string
}>

export const Messages: React.FC<Props> = props => {
  const selfId = useSelector(({ self }) => self.data!.id)
  const messages = useSelector(({ chats }) => chats.chats[props.chatId].messages)
  const queue = useSelector(({ chats }) => chats.chats[props.chatId].queue)

  const messageList = getMessageList(messages, queue)

  return (
    <div className={styles.container}>
      {messageList.map(message => {
        const self = !isMessageOfficial(message) || message.userId === selfId

        return (
          <MessageBubble key={message.id} self={self}>
            {message.content}
          </MessageBubble>
        )
      })}
    </div>
  )
}
