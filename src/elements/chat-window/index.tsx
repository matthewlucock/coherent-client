import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'

import { Messages } from './messages'
import { MessageBar } from './message-bar'

export const ChatWindow: React.FC = () => {
  const chatId = useSelector(({ chats }) => chats.selected)

  return (
    <div className={styles.container}>
      {chatId !== null && (
        <>
          <Messages chatId={chatId} />
          <MessageBar chatId={chatId} />
        </>
      )}
    </div>
  )
}
