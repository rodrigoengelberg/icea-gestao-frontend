import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageTitle } from '../../../_start/layout/core'

import MemberAddPage from './pages/MemberAddPage'
import MemberListPage from './pages/MemberListPage'
import MemberEditPage from './pages/MemberEditPage'

const MembersPage: React.FC = () => {
  return (
    <Switch>
      <Route path="/members/list">
        <>
          <PageTitle>Consulta</PageTitle>
          <MemberListPage />
        </>
      </Route>
      <Route path="/members/add">
        <>
          <PageTitle>Cadastrar</PageTitle>
          <MemberAddPage />
        </>
      </Route>
      <Route path="/members/edit/:id">
        <>
          <PageTitle>Editar</PageTitle>
          <MemberEditPage />
        </>
      </Route>

      <Redirect from="/members" exact={true} to="/members/list" />
      <Redirect to="/members" />
    </Switch>
  )
}

export default MembersPage
