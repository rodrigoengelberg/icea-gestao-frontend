import axios from 'axios'

const API_URL = 'https://servicodados.ibge.gov.br/api/v1'

export const STATES_IBGE_URL = `${API_URL}/localidades/estados?orderBy=nome`
export const CITIES_IBGE_URL = `${API_URL}/localidades/estados/`

interface IRegion {
  id: string
  sigla: string
  nome: string
}

interface IState {
  id: string
  sigla: string
  nome: string
  regiao: IRegion
}

interface ICities {
  id: string
  nome: string
}

export function getStatesFromIBGE() {
  return axios.get<IState[]>(STATES_IBGE_URL)
}

export function getCitiesFromIBGE(uf: string) {
  return axios.get<ICities[]>(CITIES_IBGE_URL + uf + '/municipios?orderBy=nome')
}
