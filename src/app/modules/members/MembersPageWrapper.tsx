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
import { membersSubMenu } from './MembersPageData'

const membersBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/',
    isActive: false
  }
]

const defaultPageConfig = getConfig()
const generalPageConfig: Partial<IThemeConfig> = {
  sidebar: {
    ...defaultPageConfig.sidebar,
    display: false,
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
        breadcrumbs={membersBreadCrumbs}
        submenu={membersSubMenu}
      />
      <MembersPage />
    </>
  )
}

export default MembersPageWrapper
