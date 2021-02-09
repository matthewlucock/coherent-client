import * as React from 'react'

import { AppBar } from 'coherent/elements/app-bar'
import { ChatList } from 'coherent/elements/chat-list'
import { ChatWindow } from 'coherent/elements/chat-window'

import styles from './styles.scss'

export const Main: React.FC = () => (
  <div className={styles.container}>
    <AppBar />

    <div className={styles.chats}>
      <ChatList />
      <ChatWindow />
    </div>
  </div>
)
