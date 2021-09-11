import axios from 'axios'
import { MemberModel } from '../models/MemberModel'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const MEMBERS_URL = `${API_URL}/members`
export const MEMBERS_NATIONALITIES_URL = `${API_URL}/members/nationalities`
export const MEMBERS_OCCUPATIONS_URL = `${API_URL}/members/occupations`

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

export function save(
  first_name: string,
  full_name: string,
  email: string,
  gender: string,
  marital_status: string,
  nationality: string,
  birth_date: string,
  occupation: string,
  schooling: string,
  facebook_link: string,
  instagram_link: string
) {
  return axios.post<MemberModel>(MEMBERS_URL, {
    first_name,
    full_name,
    email,
    gender,
    marital_status,
    nationality,
    birth_date,
    occupation,
    schooling,
    facebook_link,
    instagram_link
  })
}

export function update(
  id: string,
  first_name: string,
  full_name: string,
  email: string,
  gender: string,
  marital_status: string,
  nationality: string,
  birth_date: string,
  occupation: string,
  schooling: string,
  facebook_link: string,
  instagram_link: string
) {
  return axios.put<MemberModel>(MEMBERS_URL + '/' + id, {
    first_name,
    full_name,
    email,
    gender,
    marital_status,
    nationality,
    birth_date,
    occupation,
    schooling,
    facebook_link,
    instagram_link
  })
}

export function getMemberById(memberId: string) {
  return axios.get<MemberModel>(MEMBERS_URL + '/' + memberId)
}

export function getAllMembers() {
  return axios.get<MemberModel[]>(MEMBERS_URL)
}

export function getNationalities() {
  return axios.get<NationalityModel[]>(MEMBERS_NATIONALITIES_URL)
}

export function getOccupations() {
  return axios.get<OccupationModel[]>(MEMBERS_OCCUPATIONS_URL)
}
