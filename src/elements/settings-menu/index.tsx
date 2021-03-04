import * as React from 'react'
import {
  faMoon as fasMoon,
  faSignOutAlt as fasSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons'

import styles from './styles.scss'

import { useSelector, dispatch } from 'coherent/store'
import { uiActions } from 'coherent/store/ui'
import { logout } from 'coherent/logic/auth'

import { Menu } from 'coherent/components/menu'
import { MenuItem } from 'coherent/components/menu-item'
import { UserIcon } from 'coherent/components/user-icon'

const OFFSET = { right: 20 }

export const SettingsMenu: React.FC = () => {
  const visible = useSelector(({ ui }) => ui.userMenuVisible)
  const darkTheme = useSelector(({ ui }) => ui.darkTheme)

  const [button, setButton] = React.useState<HTMLDivElement | null>(null)

  return (
    <div
      className={styles.container}
      onClick={(event): void => event.stopPropagation()}
    >
      <div
        ref={setButton}
        className={styles.iconContainer}
        onClick={() => {
          dispatch(uiActions.setUserMenuVisible(!visible))
        }}
      >
        <UserIcon />
      </div>

      <Menu button={button} offset={OFFSET} visible={visible}>
        <MenuItem
          icon={darkTheme ? farMoon : fasMoon}
          onClick={(): void => {
            dispatch(uiActions.setDarkTheme(!darkTheme))
          }}
        >
          Use {darkTheme ? 'light' : 'dark'} theme
        </MenuItem>

        <MenuItem
          className={styles.logout}
          icon={fasSignOutAlt}
          onClick={(): void => {
            logout().catch(console.error)
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  )
}
