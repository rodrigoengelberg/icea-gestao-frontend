import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import clsx from 'clsx'
import { useTheme } from '../core'
import { DrawerComponent } from '../../assets/ts/components'

type Props = {
  children?: any
}

const Content: React.FC<Props> = ({ children }) => {
  const { config } = useTheme()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div className={clsx({ container: config.content.layout === 'default' })}>
      {children}
    </div>
  )
}

export { Content }
