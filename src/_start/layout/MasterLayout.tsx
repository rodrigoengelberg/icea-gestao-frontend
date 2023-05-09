import React from 'react'
import { AsideDefault } from './components/aside/AsideDefault'
import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { Sidebar } from './components/Sidebar'
import { Toolbar } from './components/Toolbar'
import { ScrollTop } from './components/ScrollTop'
import { Content } from './components/Content'
import { MasterInit } from './MasterInit'
import { PageDataProvider } from './core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { ExploreMain } from '../partials'

type Props = {
  children?: any
}

const MasterLayout: React.FC<Props> = ({ children }) => {
  return (
    <PageDataProvider>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <AsideDefault />
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <HeaderWrapper />
            <div className="d-flex flex-column flex-column-fluid">
              <Toolbar />
              <div
                className="content fs-6 d-flex flex-column-fluid"
                id="kt_content"
              >
                <Content>{children}</Content>
                <ToastContainer />
              </div>
            </div>
            <Footer />
          </div>
          <Sidebar />
        </div>
      </div>
      <ScrollTop />
      <MasterInit />
      {/* <ExploreMain /> */}
    </PageDataProvider>
  )
}

export { MasterLayout }
