import * as React from 'react'
import {
  faMoon as fasMoon,
  faSignOutAlt as fasSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons'

import styles from './styles.scss'

import { useSelector, dispatch } from 'coherent/store'
import { uiActions } from 'coherent/store/slices/ui'
import { logout } from 'coherent/logic/auth'

import { Menu } from 'coherent/components/menu'
import { MenuItem, MenuItemIcon } from 'coherent/components/menu-item'
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
          onClick={(): void => {
            dispatch(uiActions.setDarkTheme(!darkTheme))
          }}
        >
          <MenuItemIcon icon={darkTheme ? farMoon : fasMoon} />
          Use {darkTheme ? 'light' : 'dark'} theme
        </MenuItem>

        <MenuItem
          className={styles.logout}
          onClick={(): void => {
            logout().catch(console.error)
          }}
        >
          <MenuItemIcon icon={fasSignOutAlt} colored />
          Log out
        </MenuItem>
      </Menu>
    </div>
  )
}
