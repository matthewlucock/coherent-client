import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons'

type Props = Readonly<{
  className?: string
}>

export const UserIcon: React.FC<Props> = props => (
  <FontAwesomeIcon className={props.className} icon={fasUserCircle} />
)
