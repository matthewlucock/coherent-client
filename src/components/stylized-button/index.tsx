import * as React from 'react'
import clsx from 'clsx'

import styles from './styles.scss'

type Props = Readonly<JSX.IntrinsicElements['button']>

export const StylizedButton: React.FC<Props> = props => {
  const { className, ...rest } = props
  return <button className={clsx(styles.button, props.className)} {...rest} />
}
