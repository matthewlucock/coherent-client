import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'
import { selectChat } from 'coherent/logic/chats'

import { ChatCard } from 'coherent/components/chat-card'

export const ChatList: React.FC = () => {
  const chats = useSelector(({ chats }) => Object.entries(chats.chats))
  const selected = useSelector(({ chats }) => chats.selected)
  const users = useSelector(({ users }) => users)

  return (
    <div className={styles.container}>
      {chats.map(([id, chat]) => {
        return (
          <ChatCard
            key={id}
            username={users[chat.participantIds[0]].displayUsername}
            message='Lorem ipsum dolor sit amet'
            selected={id === selected}
            select={() => selectChat(id)}
          />
        )
      })}
    </div>
  )
}
