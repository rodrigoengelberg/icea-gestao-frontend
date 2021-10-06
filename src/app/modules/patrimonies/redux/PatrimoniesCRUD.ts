import axios from 'axios'
import { PatrimonyModel } from '../models/PatrimonyModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const MEMBERS_URL = `${API_URL}/patrimonies`

export function save(
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  marital_status: string,
  nationality: string,
  birth_date: string,
  occupation: string,
  schooling: string,
  facebook_link: string,
  instagram_link: string,
  member_contact: any,
  member_spiritual: any
) {
  return axios.post<PatrimonyModel>(MEMBERS_URL, {
    first_name,
    last_name,
    email,
    gender,
    marital_status,
    nationality,
    birth_date,
    occupation,
    schooling,
    facebook_link,
    instagram_link,
    member_contact,
    member_spiritual
  })
}

export function update(
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  marital_status: string,
  nationality: string,
  birth_date: string,
  occupation: string,
  schooling: string,
  facebook_link: string,
  instagram_link: string,
  member_contact: any,
  member_spiritual: any
) {
  return axios.put<PatrimonyModel>(MEMBERS_URL + '/' + id, {
    first_name,
    last_name,
    email,
    gender,
    marital_status,
    nationality,
    birth_date,
    occupation,
    schooling,
    facebook_link,
    instagram_link,
    member_contact,
    member_spiritual
  })
}

export function deletePatrimony(patrimonyId: string) {
  return axios.delete<{ message: string }>(MEMBERS_URL + '/' + patrimonyId)
}

export function getPatrimonyById(patrimonyId: string) {
  return axios.get<PatrimonyModel>(MEMBERS_URL + '/' + patrimonyId)
}

export function getAllPatrimony() {
  return axios.get<PatrimonyModel[]>(MEMBERS_URL)
}
