/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import Grid from '@material-ui/core/Grid'
import MomentUtils from '@date-io/moment'
import moment, { Moment } from 'moment'
import 'moment/locale/pt-br'
import * as Yup from 'yup'

import {
  getNationalities,
  getOccupations,
  deleteMember
} from '../redux/PatrimoniesCRUD'

import {
  getStatesFromIBGE,
  getCitiesFromIBGE
} from '../../shared/services/UtilsService'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'
import { KTSVG } from '../../../../_start/helpers/components/KTSVG'

interface IPatrimonyProps {
  onSubmit: any
  patrimony?: IMemberState
}

interface IMemberState {
  id?: string
  description: string
  accounting_classification?: number
  accounting_classification_name?: string
  localization?: string
  observations?: string
}

const patrimonySchema = Yup.object().shape({
  id: Yup.string(),
  description: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Primeiro nome é obrigatório'),
  accounting_classification: Yup.number(),
  accounting_classification_name: Yup.string(),
  localization: Yup.string(),
  observations: Yup.string()
})

const initialValues = {
  id: '',
  description: '',
  accounting_classification: '',
  accounting_classification_name: '',
  localization: '',
  observations: ''
}

const patrimony: React.FC<IPatrimonyProps> = props => {
  const [loading, setLoading] = useState(false)
  const [nationalities, setNationalities] = useState<NationalityModel[]>([])
  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [selectedBirthDate, setSelectedBirthDate] =
    React.useState<Moment | null>(null)

  const history = useHistory()

  const handleBirthDateChange = (date: Moment | null) => {
    if (date) {
      setSelectedBirthDate(date)
      formik.setFieldValue('birth_date', date.toISOString())
    }
  }

  const onClickDelete = () => {
    deleteMember(formik.values.id)
      .then(() => {
        toast.success('Membro ICEA excluído com sucesso!')
        history.replace('/members/list')
      })
      .catch(() => {
        formik.setStatus('Ocorreu um problema ao alterar o membro ICEA')
      })
  }

  useEffect(() => {
    if (states.length === 0) {
      getStatesFromIBGE()
        .then(({ data: states }) => {
          setStates(states)
        })
        .catch(() => {
          formik.setStatus('Ocorreu um problema ao consultar Estados do IBGE')
        })
    }
  }, [states])

  const formik = useFormik({
    initialValues,
    validationSchema: patrimonySchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        props.onSubmit(
          values.description,
          values.accounting_classification,
          values.accounting_classification_name,
          values.localization,
          values.observations,
          setLoading,
          setStatus,
          setSubmitting
        )
      }, 1000)
    }
  })

  useEffect(() => {
    if (props.patrimony) {
      formik.setFieldValue('id', props.patrimony.id)
      formik.setFieldValue('description', props.patrimony.description)
      formik.setFieldValue(
        'accounting_classification',
        props.patrimony.accounting_classification
      )
      formik.setFieldValue(
        'accounting_classification_name',
        props.patrimony.accounting_classification_name
      )
      formik.setFieldValue('localization', props.patrimony.localization)
      formik.setFieldValue('observations', props.patrimony.observations)
    }
  }, [props.patrimony])

  return (
    <>
      <div className="card card-custom shadow">
        <div className="card-header card-header-stretch">
          <div className="card-title pt-6 pb-3">
            <div className="d-flex justify-content-between flex-column flex-md-row">
              <h1 className="display-6 text-dark fw-bolder">
                Cadastro de Membros
                <span className="d-flex flex-column fs-4 fw-bold text-muted">
                  <span>Gerenciar o cadastro de um membro da ICEA</span>
                </span>
              </h1>
            </div>
          </div>
          <div className="card-toolbar pt-12">
            <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#kt_tab_pane_7"
                >
                  Geral
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#kt_tab_pane_8"
                >
                  Contato
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#kt_tab_pane_9"
                >
                  Espiritual
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          {/*begin::Form */}
          <form
            noValidate
            id="kt_add_member_form"
            className="form w-100"
            onSubmit={formik.handleSubmit}
          >
            {formik.status ? (
              <div className="mb-lg-15 alert alert-danger">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="kt_tab_pane_7"
                role="tabpanel"
              >
                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Primeiro nome
                      </label>
                      <input
                        placeholder="Primeiro nome"
                        {...formik.getFieldProps('first_name')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          {
                            'is-invalid':
                              formik.touched.first_name &&
                              formik.errors.first_name
                          },
                          {
                            'is-valid':
                              formik.touched.first_name &&
                              !formik.errors.first_name
                          }
                        )}
                        type="text"
                        name="first_name"
                        autoComplete="off"
                      />
                      {formik.touched.first_name && formik.errors.first_name && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.first_name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-12 col-xl-8">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Sobrenome
                      </label>
                      <input
                        placeholder="Sobrenome"
                        {...formik.getFieldProps('last_name')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          {
                            'is-invalid':
                              formik.touched.last_name &&
                              formik.errors.last_name
                          },
                          {
                            'is-valid':
                              formik.touched.last_name &&
                              !formik.errors.last_name
                          }
                        )}
                        type="text"
                        name="last_name"
                        autoComplete="off"
                      />
                      {formik.touched.last_name && formik.errors.last_name && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.last_name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/*end::Form group */}

                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Gênero
                      </label>
                      <select
                        id="gender"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('gender')}
                      >
                        <option>Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.gender}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Estado civil
                      </label>
                      <select
                        id="marital_status"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('marital_status')}
                      >
                        <option>Selecione</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Noivo(a)">Noivo(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Data de nascimento
                      </label>
                      <div className="form-label fs-6 fw-bolder text-dark">
                        <MuiPickersUtilsProvider
                          locale="pt-br"
                          utils={MomentUtils}
                        >
                          <Grid container justifyContent="space-between">
                            <KeyboardDatePicker
                              disableToolbar
                              clearable
                              id="birth_date"
                              okLabel="OK"
                              clearLabel="Limpar"
                              cancelLabel="Cancelar"
                              variant="dialog"
                              placeholder="DD/MM/AAAA"
                              format="DD/MM/yyyy"
                              margin="dense"
                              {...formik.getFieldProps('birth_date')}
                              value={selectedBirthDate}
                              invalidDateMessage="Data em formato inválido."
                              onChange={handleBirthDateChange}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end::Form group */}

                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Nacionalidade
                      </label>
                      <select
                        id="nationality"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('nationality')}
                      >
                        <option>Selecione</option>
                        {nationalities
                          ? nationalities.map(
                              (nationality: NationalityModel) => {
                                return (
                                  <option
                                    key={nationality.id}
                                    value={nationality.name}
                                  >
                                    {nationality.name}
                                  </option>
                                )
                              }
                            )
                          : ''}
                      </select>
                      {formik.touched.nationality && formik.errors.nationality && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.nationality}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-10 fv-plugins-icon-container col-lg-12 col-xl-8">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Email
                    </label>
                    <input
                      placeholder="Email"
                      {...formik.getFieldProps('email')}
                      className={clsx(
                        'form-control form-control-lg form-control-solid',
                        {
                          'is-invalid':
                            formik.touched.email && formik.errors.email
                        },
                        {
                          'is-valid':
                            formik.touched.email && !formik.errors.email
                        }
                      )}
                      type="email"
                      name="email"
                      autoComplete="off"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.email}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/*end::Form group */}

                <div className="row ">
                  <div className="d-flex justify-content-between pb-10 flex-column flex-md-row">
                    <h1 className="display-8 text-dark fw-bolder">
                      <span className="d-flex flex-column fs-4 fw-bold text-muted">
                        <span>Outras informações</span>
                      </span>
                    </h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Profissão
                      </label>
                      <select
                        id="occupation"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('occupation')}
                      >
                        <option>Selecione</option>
                        {occupations
                          ? occupations.map((occupation: OccupationModel) => {
                              return (
                                <option
                                  key={occupation.occupation}
                                  value={occupation.occupation_name}
                                >
                                  {occupation.occupation_name}
                                </option>
                              )
                            })
                          : ''}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Escolaridade
                      </label>
                      <select
                        id="schooling"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('schooling')}
                      >
                        <option>Selecione</option>
                        <option value="Ensino Fundamental">
                          Ensino Fundamental
                        </option>
                        <option value="Ensino Médio Incompleto">
                          Ensino Médio Incompleto
                        </option>
                        <option value="Ensino Médio">Ensino Médio</option>
                        <option value="Superior Incompleto">
                          Superior Incompleto
                        </option>
                        <option value="Superior">
                          Superior (Bacharel, Licenciatura, Tecnólogo)
                        </option>
                        <option value="Pós graduação">
                          Pós graduação (Especialização, MBA)
                        </option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Doutorado">Doutorado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Facebook
                      </label>
                      <input
                        id="facebook_link"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('facebook_link')}
                        placeholder="https://facebook.com/exemplo"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Instagram
                      </label>
                      <input
                        id="instagram_link"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('instagram_link')}
                        placeholder="https://instagram.com/exemplo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="kt_tab_pane_8" role="tabpanel">
                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Endereço
                      </label>
                      <input
                        id="member_contact.address"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('member_contact.address')}
                        placeholder="Endereço"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-2">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        CEP
                      </label>
                      <input
                        id="member_contact.zipcode"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('member_contact.zipcode')}
                        placeholder="CEP"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-3">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Estado
                      </label>
                      <select
                        id="member_contact.state"
                        onClick={(data: any) => onClickState(data)}
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('member_contact.state')}
                      >
                        <option>Selecione</option>
                        {states
                          ? states.map((state: any) => {
                              return (
                                <option key={state.sigla} value={state.sigla}>
                                  {state.nome}
                                </option>
                              )
                            })
                          : ''}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-8 col-xl-3">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Cidade
                      </label>
                      <select
                        id="member_contact.city"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('member_contact.city')}
                      >
                        <option>Selecione</option>
                        {cities
                          ? cities.map((cities: any) => {
                              return (
                                <option key={cities.nome} value={cities.nome}>
                                  {cities.nome}
                                </option>
                              )
                            })
                          : ''}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-2">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Tipo do Telefone
                    </label>
                    <div className="mb-10">
                      <select
                        id="phone_type_name"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps(
                          'member_contact.phone_type_name'
                        )}
                      >
                        <option>Selecione</option>
                        <option value="Celular">Celular</option>
                        <option value="Casa">Casa</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-3">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Número do Telefone
                      </label>
                      <input
                        id="member_contact.phone_number"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('member_contact.phone_number')}
                        placeholder="(99) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
                {/*end::Form group */}
              </div>

              <div className="tab-pane fade" id="kt_tab_pane_9" role="tabpanel">
                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Situação
                      </label>
                      <select
                        id="member_spiritual.member_status"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps(
                          'member_spiritual.member_status'
                        )}
                      >
                        <option>Selecione</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                        <option value="Especial">Especial</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Função
                      </label>
                      <select
                        id="member_spiritual.member_function"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps(
                          'member_spiritual.member_function'
                        )}
                      >
                        <option>Selecione</option>
                        <option value="Membro">Membro</option>
                        <option value="Assistente">Assistente</option>
                        <option value="Voluntário">Voluntário</option>
                        <option value="Evangelizador">Evangelizador</option>
                        <option value="Seminarista">Seminarista</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Dizimista
                      </label>
                      <select
                        id="member_spiritual.tithe_member"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps(
                          'member_spiritual.tithe_member'
                        )}
                      >
                        <option>Selecione</option>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*end::Form group */}

                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Batismo
                      </label>
                      <div className="form-label fs-6 fw-bolder text-dark">
                        <MuiPickersUtilsProvider
                          locale="pt-br"
                          utils={MomentUtils}
                        >
                          <Grid container justifyContent="space-between">
                            <KeyboardDatePicker
                              disableToolbar
                              clearable
                              id="member_spiritual.baptism_date"
                              okLabel="OK"
                              clearLabel="Limpar"
                              cancelLabel="Cancelar"
                              variant="dialog"
                              placeholder="DD/MM/AAAA"
                              format="DD/MM/yyyy"
                              margin="dense"
                              {...formik.getFieldProps(
                                'member_spiritual.baptism_date'
                              )}
                              value={selectedBaptismDate}
                              invalidDateMessage="Data em formato inválido."
                              onChange={handleBaptismDateChange}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Recepção na ICEA
                      </label>
                      <div className="form-label fs-6 fw-bolder text-dark">
                        <MuiPickersUtilsProvider
                          locale="pt-br"
                          utils={MomentUtils}
                        >
                          <Grid container justifyContent="space-between">
                            <KeyboardDatePicker
                              disableToolbar
                              clearable
                              id="member_spiritual.joined_date"
                              okLabel="OK"
                              clearLabel="Limpar"
                              cancelLabel="Cancelar"
                              variant="dialog"
                              placeholder="DD/MM/AAAA"
                              format="DD/MM/yyyy"
                              margin="dense"
                              {...formik.getFieldProps(
                                'member_spiritual.joined_date'
                              )}
                              value={selectedJoinedDate}
                              invalidDateMessage="Data em formato inválido."
                              onChange={handleJoinedDateChange}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-8">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Problemas e pedidos de oração
                      </label>
                      <textarea
                        id="member_spiritual.problems"
                        placeholder="Descrever as observações"
                        className="form-control form-control-lg form-control-solid"
                        {...formik.getFieldProps('member_spiritual.problems')}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                {/*end::Form group */}
              </div>
            </div>
            {/*begin::Action */}
            <div className="d-flex flex-column flex-row-fluid">
              <div className="d-flex flex-row flex-column-fluid">
                <div className="d-flex flex-row-fluid flex-right">
                  <Link to="/members/list">
                    <button
                      type="button"
                      id="kt_add_member_form_back_button"
                      className="btn btn-secondary fw-bolder fs-6 px-8 py-4 my-3 me-3"
                    >
                      <span className="indicator-label">Voltar</span>
                    </button>
                  </Link>
                  {props.member && props.member.id && (
                    <button
                      type="button"
                      id="kt_add_member_form_delete_button"
                      className="btn btn-danger fw-bolder fs-6 px-8 py-4 my-3 me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_delete"
                    >
                      <span className="indicator-label">Excluir</span>
                    </button>
                  )}
                </div>

                <div className="d-flex flex-row-auto flex-center">
                  <button
                    type="submit"
                    id="kt_add_member_form_submit_button"
                    className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!loading && (
                      <span className="indicator-label">Salvar</span>
                    )}
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: 'block' }}
                      >
                        Carregando...{' '}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/*end::Action */}
          </form>
          {/*end::Form */}
        </div>
      </div>

      <div className="modal fade" tabIndex={-1} id="kt_modal_delete">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmação</h5>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="/media/icons/duotone/Navigation/Close.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body">
              <p>Você realmente deseja excluir este membro?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => onClickDelete()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberForm
