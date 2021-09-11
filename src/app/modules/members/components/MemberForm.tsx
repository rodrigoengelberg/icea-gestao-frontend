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
} from '../redux/MemberCRUD'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'
import { KTSVG } from '../../../../_start/helpers/components/KTSVG'

interface IMemberProps {
  onSubmit: any
  member?: IMemberState
}

interface IMemberState {
  id?: string
  first_name: string
  last_name: string
  gender: string
  nationality: string
  marital_status?: string
  birth_date?: string
  email?: string
  occupation?: string
  schooling?: string
  facebook_link?: string
  instagram_link?: string
}

const memberSchema = Yup.object().shape({
  id: Yup.string(),
  first_name: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Primeiro nome é obrigatório'),
  last_name: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Sobrenome é obrigatório'),
  gender: Yup.string().required('Gênero é obrigatório'),
  nationality: Yup.string().required('Nacionalidade é obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .max(50, 'Máximo de 50 caracteres'),
  marital_status: Yup.string(),
  birth_date: Yup.string(),
  occupation: Yup.string(),
  schooling: Yup.string(),
  facebook_link: Yup.string(),
  instagram_link: Yup.string()
})

const initialValues = {
  id: '',
  first_name: '',
  last_name: '',
  gender: '',
  nationality: '',
  marital_status: '',
  birth_date: '',
  email: '',
  occupation: '',
  schooling: '',
  facebook_link: '',
  instagram_link: ''
}

const MemberForm: React.FC<IMemberProps> = props => {
  const [loading, setLoading] = useState(false)
  const [nationalities, setNationalities] = useState<NationalityModel[]>([])
  const [occupations, setOccupations] = useState<OccupationModel[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(null)

  const history = useHistory()

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setSelectedDate(date)
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
    if (nationalities.length === 0) {
      getNationalities()
        .then(({ data: nationalities }) => {
          setNationalities(nationalities)
        })
        .catch(() => {
          formik.setStatus('Ocorreu um problema ao consultar Nacionalidades')
        })
    }
  }, [nationalities])

  useEffect(() => {
    if (occupations.length === 0) {
      getOccupations()
        .then(({ data: occupations }) => {
          setOccupations(occupations)
        })
        .catch(() => {
          formik.setStatus('Ocorreu um problema ao consultar Profissões')
        })
    }
  }, [occupations])

  const formik = useFormik({
    initialValues,
    validationSchema: memberSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        props.onSubmit(
          values.first_name,
          values.last_name,
          values.gender,
          values.nationality,
          values.marital_status,
          values.birth_date,
          values.email,
          values.occupation,
          values.schooling,
          values.facebook_link,
          values.instagram_link,
          setLoading,
          setStatus,
          setSubmitting
        )
      }, 1000)
    }
  })

  useEffect(() => {
    if (props.member) {
      formik.setFieldValue('id', props.member.id)
      formik.setFieldValue('first_name', props.member.first_name)
      formik.setFieldValue('last_name', props.member.last_name)
      formik.setFieldValue('gender', props.member.gender)
      formik.setFieldValue('nationality', props.member.nationality)
      formik.setFieldValue('marital_status', props.member.marital_status)
      formik.setFieldValue('email', props.member.email)
      if (props.member.birth_date) {
        setSelectedDate(moment(props.member.birth_date))
        formik.setFieldValue('birth_date', props.member.birth_date)
      }
      formik.setFieldValue('occupation', props.member.occupation)
      formik.setFieldValue('schooling', props.member.schooling)
      formik.setFieldValue('facebook_link', props.member.facebook_link)
      formik.setFieldValue('instagram_link', props.member.instagram_link)
    }
  }, [props.member])

  return (
    <>
      <div className="card">
        <div className="card-body p-12">
          <div className="row ">
            <div className="d-flex justify-content-between pb-10  flex-column flex-md-row">
              <h1 className="display-6 text-dark fw-bolder mb-10">
                Cadastro de Membros
                <span className="d-flex flex-column fs-4 fw-bold text-muted">
                  <span>Gerenciar o cadastro de um membro da ICEA</span>
                </span>
              </h1>
            </div>
          </div>

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
                          formik.touched.first_name && formik.errors.first_name
                      },
                      {
                        'is-valid':
                          formik.touched.first_name && !formik.errors.first_name
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
              <div className="col-md-4 col-lg-12 col-xl-6">
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
                          formik.touched.last_name && formik.errors.last_name
                      },
                      {
                        'is-valid':
                          formik.touched.last_name && !formik.errors.last_name
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
                    <MuiPickersUtilsProvider locale="pt-br" utils={MomentUtils}>
                      <Grid container justifyContent="space-between">
                        <KeyboardDatePicker
                          disableToolbar
                          clearable
                          id="date-picker-inline"
                          okLabel="OK"
                          clearLabel="Limpar"
                          cancelLabel="Cancelar"
                          variant="dialog"
                          placeholder="DD/MM/AAAA"
                          format="DD/MM/yyyy"
                          margin="dense"
                          {...formik.getFieldProps('birth_date')}
                          value={selectedDate}
                          invalidDateMessage="Data em formato inválido."
                          onChange={handleDateChange}
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
                      ? nationalities.map((nationality: NationalityModel) => {
                          return (
                            <option
                              key={nationality.id}
                              value={nationality.name}
                            >
                              {nationality.name}
                            </option>
                          )
                        })
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
                      'is-invalid': formik.touched.email && formik.errors.email
                    },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email
                    }
                  )}
                  type="email"
                  name="email"
                  autoComplete="off"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.email}</div>
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

            {/*begin::Action */}

            <div className="d-flex flex-column flex-row-fluid">
              <div className="d-flex flex-row flex-column-fluid">
                <div className="d-flex flex-row-fluid flex-right">
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

                <div className="d-flex flex-row-auto w-200px flex-center">
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
                  <Link to="/members/list">
                    <button
                      type="button"
                      id="kt_add_member_form_back_button"
                      className="btn btn-secondary fw-bolder fs-6 px-8 py-4 my-3 me-3"
                    >
                      <span className="indicator-label">Voltar</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-6"></div>
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