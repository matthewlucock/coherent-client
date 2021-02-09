import * as React from 'react'

import { useSelector } from 'coherent/store'

import { Messages } from './messages'
import { MessageBar } from './message-bar'

import styles from './styles.scss'

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
