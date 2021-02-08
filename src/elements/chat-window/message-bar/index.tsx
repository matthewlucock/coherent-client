import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp as fasArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { queueMessage } from 'coherent/api/chats'

type Props = Readonly<{
  chatId: string
}>

export const MessageBar: React.FC<Props> = props => {
  const messageBox = React.useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = React.useState('')

  const empty = message.length === 0

  const onInput = (): void => {
    if (messageBox.current === null) return
    setMessage(messageBox.current.value)
  }

  const submit: React.FormEventHandler = event => {
    event.preventDefault()
    if (empty) return
    queueMessage({ chatId: props.chatId, content: message })
    setMessage('')
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.messageBox}>
          <input
            ref={messageBox}
            className={styles.messageInput}
            type='text'
            value={message}
            onInput={onInput}
            placeholder='Type a message'
          />
        </div>

        <button className={styles.submit} type='submit' disabled={empty}>
          <FontAwesomeIcon icon={fasArrowCircleUp} />
        </button>
      </form>
    </div>
  )
}
