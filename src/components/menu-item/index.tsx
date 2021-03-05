import * as React from 'react'
import clsx from 'clsx'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './styles.scss'

type MenuItemProps = Readonly<{
  className?: string
  onClick?: () => void
}>
export const MenuItem: React.FC<MenuItemProps> = props => (
  <div className={clsx(styles.menuItem, props.className)} onClick={props.onClick}>
    {props.children}
  </div>
)

type MenuItemIconProps = Readonly<{
  icon: IconProp
  colored?: boolean
}>
export const MenuItemIcon: React.FC<MenuItemIconProps> = props => (
  <FontAwesomeIcon
    className={clsx(styles.icon, props.colored === true && styles.colored)}
    icon={props.icon}
  />
)
