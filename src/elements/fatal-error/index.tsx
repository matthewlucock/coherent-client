import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle as fasExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { StylizedButton } from 'coherent/components/stylized-button'

type Props = Readonly<{
  heading: string
  paragraph: string
}>

export const FatalError: React.FC<Props> = props => (
  <div className={styles.container}>
    <FontAwesomeIcon className={styles.errorIcon} icon={fasExclamationCircle} />

    <div className={styles.heading}>{props.heading}</div>
    <div className={styles.paragraph}>{props.paragraph}</div>

    <StylizedButton className={styles.reload} onClick={(): void => {
      window.location.reload()
    }}>
      Reload
    </StylizedButton>
  </div>
)

export const FatalNoConnection: React.FC = () => (
  <FatalError
    heading="Can't connect to server"
    paragraph='Check that the server is running and try again.'
  />
)
