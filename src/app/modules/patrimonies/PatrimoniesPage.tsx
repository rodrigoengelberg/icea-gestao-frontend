import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageTitle } from '../../../_start/layout/core'

import PatrimonyAddPage from './pages/PatrimoniesAddPage'
import PatrimonyListPage from './pages/PatrimoniesListPage'
import PatrimonyEditPage from './pages/PatrimoniesEditPage'

const PatrimoniesPage: React.FC = () => {
  return (
    <Switch>
      <Route path="/patrimony/list">
        <>
          <PageTitle>Consulta</PageTitle>
          <PatrimonyListPage />
        </>
      </Route>
      <Route path="/patrimony/add">
        <>
          <PageTitle>Cadastrar</PageTitle>
          <PatrimonyAddPage />
        </>
      </Route>
      <Route path="/patrimony/edit/:id">
        <>
          <PageTitle>Editar</PageTitle>
          <PatrimonyEditPage />
        </>
      </Route>

      <Redirect from="/patrimony" exact={true} to="/patrimony/list" />
      <Redirect to="/patrimony" />
    </Switch>
  )
}

export default PatrimoniesPage
