import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../../app/modules/auth'
import * as members from '../../app/modules/members'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  members: members.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(), members.saga()])
}
