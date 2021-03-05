import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'

import { Messages } from 'coherent/elements/messages'
import { MessageBar } from 'coherent/elements/message-bar'

export const ChatWindow: React.FC = () => {
  const chatId = useSelector(({ ui }) => ui.selectedChat)

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
