/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
  getConfig,
  IThemeConfig,
  PageDataContainer,
  PageLink,
  useTheme
} from '../../../_start/layout/core'
import { MembersPage } from './MembersPage'
import { generalSubmenu } from './MembersPageData'

const generalBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/',
    isActive: false
  },
  {
    title: 'General',
    path: '',
    isActive: false
  }
]

const defaultPageConfig = getConfig()
const generalPageConfig: Partial<IThemeConfig> = {
  sidebar: {
    ...defaultPageConfig.sidebar,
    display: true,
    content: 'user',
    bgColor: 'bg-info'
  }
}

const MembersPageWrapper: React.FC = () => {
  const { setTheme } = useTheme()
  //Refresh UI after config updates
  useEffect(() => {
    setTheme(generalPageConfig)
    return () => {
      setTheme(defaultPageConfig)
    }
  }, [])

  return (
    <>
      <PageDataContainer
        breadcrumbs={generalBreadCrumbs}
        submenu={generalSubmenu}
      />
      <MembersPage />
    </>
  )
}

export default MembersPageWrapper
