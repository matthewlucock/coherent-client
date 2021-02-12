import * as React from 'react'

import styles from './styles.scss'

import { useSelector } from 'coherent/store'

import { UserIcon } from 'coherent/components/user-icon'

export const Title: React.FC = () => {
  const chatParticipant: string | null = useSelector(state => {
    if (state.chats.selected === null) return null
    return state.users[state.chats.chats[state.chats.selected].participantIds[0]].displayUsername
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
