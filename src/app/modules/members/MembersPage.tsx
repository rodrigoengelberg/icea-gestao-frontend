import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AddPage } from './pages/AddPage'
import { ListPage } from './pages/ListPage'
import { PageTitle } from '../../../_start/layout/core'

export function MembersPage() {
  return (
    <Switch>
      <Route path="/members">
        <>
          <PageTitle>Membros</PageTitle>
          <ListPage />
        </>
      </Route>
      <Route path="/members/add">
        <>
          <PageTitle>Cadastro de membros</PageTitle>
          <AddPage />
        </>
      </Route>
      {/* <Redirect from="/general" exact={true} to="/general/faq" /> */}
      <Redirect to="/members" />
    </Switch>
  )
}
