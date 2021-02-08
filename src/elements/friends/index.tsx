import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends as fasUserFriends } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

export const Friends: React.FC = () => {
  // const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={fasUserFriends} />
      </div>
    </div>
  )
}
