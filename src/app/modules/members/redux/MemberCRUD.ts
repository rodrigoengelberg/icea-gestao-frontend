import axios from 'axios'
import { MemberModel } from '../models/MemberModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_MEMBERS_URL = `${API_URL}/members`

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
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<MemberModel[]>(GET_MEMBERS_URL)
}
