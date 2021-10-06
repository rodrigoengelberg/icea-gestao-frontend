/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
  getConfig,
  IThemeConfig,
  PageDataContainer,
  PageLink,
  useTheme
} from '../../../_start/layout/core'
import PatrimoniesPage from './PatrimoniesPage'
import { patrimoniesSubMenu } from './PatrimoniesPageData'

const patrimoniesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/',
    isActive: false
  },
  {
    title: 'Patrimônio',
    path: '/patrimonies',
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

const PatrimonyPageWrapper: React.FC = () => {
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
        breadcrumbs={patrimoniesBreadCrumbs}
        submenu={patrimoniesSubMenu}
      />
      <PatrimoniesPage />
    </>
  )
}

export default PatrimonyPageWrapper
