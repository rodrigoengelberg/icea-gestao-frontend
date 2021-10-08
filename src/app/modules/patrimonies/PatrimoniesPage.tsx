import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageTitle } from '../../../_start/layout/core'

import PatrimonyAddPage from './pages/PatrimoniesAddPage'
import PatrimonyListPage from './pages/PatrimoniesListPage'
import PatrimonyEditPage from './pages/PatrimoniesEditPage'

const PatrimoniesPage: React.FC = () => {
  return (
    <Switch>
      <Route path="/patrimonies/list">
        <>
          <PageTitle>Consulta</PageTitle>
          <PatrimonyListPage />
        </>
      </Route>
      <Route path="/patrimonies/add">
        <>
          <PageTitle>Cadastrar</PageTitle>
          <PatrimonyAddPage />
        </>
      </Route>
      <Route path="/patrimonies/edit/:id">
        <>
          <PageTitle>Editar</PageTitle>
          <PatrimonyEditPage />
        </>
      </Route>

      <Redirect from="/patrimonies" exact={true} to="/patrimonies/list" />
      <Redirect to="/patrimonies" />
    </Switch>
  )
}

export default PatrimoniesPage
