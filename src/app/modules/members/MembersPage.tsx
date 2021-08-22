import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AddPage } from './pages/AddPage'
import { ListPage } from './pages/ListPage'
import { EditPage } from './pages/EditPage'
import { PageTitle } from '../../../_start/layout/core'

export function MembersPage() {
  return (
    <Switch>
      <Route path="/general/faq">
        <>
          <PageTitle>FAQ</PageTitle>
          <AddPage />
        </>
      </Route>
      <Route path="/general/pricing">
        <>
          <PageTitle>Pricing</PageTitle>
          <ListPage />
        </>
      </Route>
      <Route path="/general/invoice">
        <>
          <PageTitle>Invoice</PageTitle>
          <EditPage />
        </>
      </Route>
      <Redirect from="/general" exact={true} to="/general/faq" />
      <Redirect to="/general/faq" />
    </Switch>
  )
}
