import axios from 'axios'
import { MemberModel } from '../models/MemberModel'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const MEMBERS_URL = `${API_URL}/members`
export const MEMBERS_NATIONALITIES_URL = `${API_URL}/members/nationalities`
export const MEMBERS_OCCUPATIONS_URL = `${API_URL}/members/occupations`

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
  instagram_link: string
) {
  return axios.post<MemberModel>(MEMBERS_URL, {
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
    instagram_link
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
  instagram_link: string
) {
  return axios.put<MemberModel>(MEMBERS_URL + '/' + id, {
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
    instagram_link
  })
}

export function deleteMember(memberId: string) {
  return axios.delete<{ message: string }>(MEMBERS_URL + '/' + memberId)
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
