import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { PatrimonyModel } from '../models/PatrimonyModel'
import { getAllPatrimony } from './PatrimoniesCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  PatrimoniesRequested: '[Requested Patrimony] Patrimony API',
  PatrimoniesLoaded: '[Load Patrimony] Patrimony API'
}

const initialPatrimonyState: IPatrimonyState = {
  patrimonies: undefined
}

export interface IPatrimonyState {
  patrimonies?: PatrimonyModel[]
}

export const reducer = persistReducer(
  { storage, key: 'v100-patrimonies', whitelist: ['patrimonies'] },
  (
    state: IPatrimonyState = initialPatrimonyState,
    action: ActionWithPayload<IPatrimonyState>
  ) => {
    switch (action.type) {
      case actionTypes.PatrimoniesRequested: {
        return { ...state, user: undefined }
      }

      case actionTypes.PatrimoniesLoaded: {
        const patrimonies = action.payload?.patrimonies
        return { ...state, patrimonies }
      }

      default:
        return state
    }
  }
)

export const actions = {
  fulfillPatrimonies: (patrimony: PatrimonyModel[]) => ({
    type: actionTypes.PatrimoniesLoaded,
    payload: { patrimony }
  })
}

export function* saga() {
  yield takeLatest(
    actionTypes.PatrimoniesRequested,
    function* patrimoniesRequested() {
      const { data: patrimonies } = yield getAllPatrimony()
      yield put(actions.fulfillPatrimonies(patrimonies))
    }
  )
}
