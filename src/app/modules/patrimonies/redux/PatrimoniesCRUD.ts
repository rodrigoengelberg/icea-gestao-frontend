import axios from 'axios'
import { PatrimonyModel } from '../models/PatrimonyModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const PATRIMONIES_URL = `${API_URL}/patrimonies`

export function save(
  description: string,
  accounting_classification: number,
  accounting_classification_name: string,
  localization: string,
  observations: string
) {
  return axios.post<PatrimonyModel>(PATRIMONIES_URL, {
    description,
    accounting_classification,
    accounting_classification_name,
    localization,
    observations
  })
}

export function update(
  id: string,
  description: string,
  accounting_classification: number,
  accounting_classification_name: string,
  localization: string,
  observations: string
) {
  return axios.put<PatrimonyModel>(PATRIMONIES_URL + '/' + id, {
    description,
    accounting_classification,
    accounting_classification_name,
    localization,
    observations
  })
}

export function deletePatrimony(patrimonyId: string) {
  return axios.delete<{ message: string }>(PATRIMONIES_URL + '/' + patrimonyId)
}

export function getPatrimonyById(patrimonyId: string) {
  return axios.get<PatrimonyModel>(PATRIMONIES_URL + '/' + patrimonyId)
}

export function getAllPatrimony() {
  return axios.get<PatrimonyModel[]>(PATRIMONIES_URL)
}
