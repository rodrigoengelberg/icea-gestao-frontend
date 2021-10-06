import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { getAllMembers } from '../../members/redux/MemberCRUD'
import { PatrimonyModel } from '../models/PatrimonyModel'
import { getAllPatrimony } from './PatrimoniesCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  MembersRequested: '[Requested Members] Member API',
  MembersLoaded: '[Load Members] Member API'
}

const initialMemberState: IMemberState = {
  members: undefined
}

export interface IMemberState {
  members?: PatrimonyModel[]
}

export const reducer = persistReducer(
  { storage, key: 'v100-members', whitelist: ['members'] },
  (
    state: IMemberState = initialMemberState,
    action: ActionWithPayload<IMemberState>
  ) => {
    switch (action.type) {
      // case actionTypes.Login: {
      //   const token = action.payload?.token
      //   return { token, user: undefined }
      // }

      // case actionTypes.Register: {
      //   const token = action.payload?.token
      //   return { token, user: undefined }
      // }

      // case actionTypes.Logout: {
      //   return initialAuthState
      // }

      case actionTypes.MembersRequested: {
        return { ...state, user: undefined }
      }

      case actionTypes.MembersLoaded: {
        const members = action.payload?.members
        return { ...state, members }
      }

      // case actionTypes.SetUser: {
      //   const user = action.payload?.user
      //   return { ...state, user }
      // }

      default:
        return state
    }
  }
)

export const actions = {
  // login: (token: string) => ({
  //   type: actionTypes.Login,
  //   payload: { token }
  // }),
  // register: (token: string) => ({
  //   type: actionTypes.Register,
  //   payload: { token }
  // }),
  // logout: () => ({ type: actionTypes.Logout }),
  // requestUser: () => ({
  //   type: actionTypes.UserRequested
  // }),
  fulfillMembers: (members: PatrimonyModel[]) => ({
    type: actionTypes.MembersLoaded,
    payload: { members }
  })
  //   setUser: (user: UserModel) => ({
  //     type: actionTypes.SetUser,
  //     payload: { user }
  //   })
}

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser())
  // })

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser())
  // })

  yield takeLatest(actionTypes.MembersRequested, function* membersRequested() {
    const { data: members } = yield getAllPatrimony()
    yield put(actions.fulfillMembers(members))
  })
}
