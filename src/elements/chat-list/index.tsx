import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'
import { selectChat } from 'coherent/logic/chats'

import { ChatCard } from 'coherent/components/chat-card'

export const ChatList: React.FC = () => {
  const chats = useSelector(({ chats }) => chats)
  const selectedChat = useSelector(({ ui }) => ui.selectedChat)
  const users = useSelector(({ users }) => users)

  return (
    <div className={styles.container}>
      {Object.entries(chats).map(([id, chat]) => {
        return (
          <ChatCard
            key={id}
            username={users[chat.participantIds[0]].displayName}
            message='Lorem ipsum dolor sit amet'
            selected={id === selectedChat}
            select={() => selectChat(id)}
          />
        )
      })}
    </div>
  )
}
