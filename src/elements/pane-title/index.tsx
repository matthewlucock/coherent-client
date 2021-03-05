import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'

import { UserIcon } from 'coherent/components/user-icon'

export const PaneTitle: React.FC = () => {
  const chatParticipant: string | null = useSelector(state => {
    const { selectedChat } = state.ui
    if (selectedChat === null) return null

    const user = state.chats[selectedChat].participantIds[0]
    return state.users[user].displayUsername
  })

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {chatParticipant !== null && (
          <>
            <UserIcon className={styles.chatIcon} />
            {chatParticipant}
          </>
        )}
      </div>
    </div>
  )
}
