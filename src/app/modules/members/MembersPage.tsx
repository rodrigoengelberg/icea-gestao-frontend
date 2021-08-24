import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AddPage } from './pages/AddPage'
import { ListPage } from './pages/ListPage'
import { PageTitle } from '../../../_start/layout/core'

export function MembersPage() {
  return (
    <Switch>
      <Route path="/members/list">
        <>
          <PageTitle>Consulta</PageTitle>
          <ListPage />
        </>
      </Route>
      <Route path="/members/add">
        <>
          <PageTitle>Cadastro</PageTitle>
          <AddPage />
        </>
      </Route>

      <Redirect from="/members" exact={true} to="/members/list" />
      <Redirect to="/members" />
    </Switch>
  )
}
