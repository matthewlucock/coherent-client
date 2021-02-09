import * as React from 'react'

import { useSelector, useDispatch } from 'coherent/store'
import { chatsActions } from 'coherent/store/chats'

import { ChatCard } from 'coherent/components/chat-card'

import styles from './styles.scss'

export const ChatList: React.FC = () => {
  const chats = useSelector(({ chats }) => Object.entries(chats.chats))
  const selected = useSelector(({ chats }) => chats.selected)
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      {chats.map(([id, chat]) => {
        return (
          <ChatCard
            key={id}
            username={users[chat.participantIds[0]].displayUsername}
            message='Lorem ipsum dolor sit amet'
            selected={id === selected}
            select={() => dispatch(chatsActions.select(id))}
          />
        )
      })}
    </div>
  )
}
