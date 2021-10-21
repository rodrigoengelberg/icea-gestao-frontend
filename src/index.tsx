import React from 'react'
import ReactDOM from 'react-dom'
//Redux
//https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import * as _redux from './setup'
import store, { persistor } from './setup/redux/Store'
//Axios
import axios from 'axios'
import { App } from './app/App'
import './_start/assets/sass/style.scss'

const { PUBLIC_URL } = process.env

_redux.setupAxios(axios, store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Carregando...</div>}>
      <App basename={PUBLIC_URL} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
