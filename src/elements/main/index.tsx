import * as React from 'react'

import styles from './styles.scss'

import { useSelector, dispatch } from 'coherent/store'
import { uiActions } from 'coherent/store/ui'

import { AppBar } from 'coherent/elements/app-bar'
import { ChatList } from 'coherent/elements/chat-list'
import { ChatWindow } from 'coherent/elements/chat-window'

export const Main: React.FC = () => {
  const userMenuVisible = useSelector(({ ui }) => ui.userMenuVisible)

  return (
    <div
      className={styles.container}
      onClick={(): void => {
        if (userMenuVisible) dispatch(uiActions.setUserMenuVisible(false))
      }}
    >
      <AppBar />

      <div className={styles.chats}>
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  )
}
