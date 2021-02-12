import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.scss'

import { useSelector, useDispatch } from 'coherent/store'
import { uiActions } from 'coherent/store/ui'

import { Menu } from 'coherent/components/menu'

export const UserMenu: React.FC = () => {
  const visible = useSelector(({ ui }) => ui.userMenuVisible)
  const dispatch = useDispatch()

  return (
    <div
      className={styles.container}
      onClick={event => {
        event.stopPropagation()
      }}
    >
      <div
        className={styles.iconContainer}
        onClick={() => {
          dispatch(uiActions.setUserMenuVisible(!visible))
        }}
      >
        <FontAwesomeIcon icon={fasUserCircle} />
      </div>

      <Menu visible={visible}>xxx</Menu>
    </div>
  )
}
