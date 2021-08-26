import axios from 'axios'
import { MemberModel } from '../models/MemberModel'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_MEMBERS_URL = `${API_URL}/members`
export const GET_NATIONALITIES_URL = `${API_URL}/members/nationalities`
export const GET_OCCUPATIONS_URL = `${API_URL}/members/occupations`

// Server should return AuthModel
// export function login(email: string, password: string) {
//   return axios.post(LOGIN_URL, { email, password })
// }

// Server should return AuthModel
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string
// ) {
//   return axios.post<AuthModel>(REGISTER_URL, {
//     email,
//     firstname,
//     lastname,
//     password
//   })
// }

// Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email })
// }

export function getAllMembers() {
  return axios.get<MemberModel[]>(GET_MEMBERS_URL)
}

export function getNationalities() {
  return axios.get<NationalityModel[]>(GET_NATIONALITIES_URL)
}

export function getOccupations() {
  return axios.get<OccupationModel[]>(GET_OCCUPATIONS_URL)
}
