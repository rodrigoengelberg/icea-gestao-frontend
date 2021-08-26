import React, { useEffect, useState } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import clsx from 'clsx'
import { useFormik } from 'formik'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'
import { Moment } from 'moment'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup'

import { getNationalities, getOccupations } from '../redux/MemberCRUD'
import { NationalityModel } from '../models/NationalityModel'
import { OccupationModel } from '../models/OccupationModel'

const memberSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Primeiro nome é obrigatório'),
  fullName: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Nome completo é obrigatório'),
  gender: Yup.string().required('Gênero é obrigatório'),
  nationality: Yup.string().required('Nacionalidade é obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .max(50, 'Máximo de 50 caracteres')
})

const initialValues = {
  firstName: '',
  fullName: '',
  gender: '',
  nationality: '',
  email: ''
}

export function AddPage() {
  const [loading] = useState(false)
  const [nationalities, setNationalities] = useState<NationalityModel[]>([])
  const [occupations, setOccupations] = useState<OccupationModel[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(null)

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (nationalities.length === 0) {
      getNationalities()
        .then(({ data: nationalities }) => {
          setNationalities(nationalities)
        })
        .catch(() => {
          alert('Ocorreu um problema ao consultar Nacionalidades')
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
          alert('Ocorreu um problema ao consultar Profissões')
        })
    }
  }, [occupations])

  const formik = useFormik({
    initialValues,
    validationSchema: memberSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setTimeout(() => {}, 1000)
    }
  })

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
            id="kt_add_member_form"
            noValidate
            className="form w-100"
            onSubmit={formik.handleSubmit}
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
                    {...formik.getFieldProps('firstName')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.firstName && formik.errors.firstName
                      },
                      {
                        'is-valid':
                          formik.touched.firstName && !formik.errors.firstName
                      }
                    )}
                    type="text"
                    name="firstName"
                    autoComplete="off"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.firstName}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-lg-12 col-xl-6">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Nome completo
                  </label>
                  <input
                    placeholder="Nome completo"
                    {...formik.getFieldProps('fullName')}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {
                        'is-invalid':
                          formik.touched.fullName && formik.errors.fullName
                      },
                      {
                        'is-valid':
                          formik.touched.fullName && !formik.errors.fullName
                      }
                    )}
                    type="text"
                    name="fullName"
                    autoComplete="off"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.fullName}
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
                  <select className="form-select form-select-solid">
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
                          invalidDateMessage="Data em formato inválido."
                          value={selectedDate}
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
                  <select className="form-select form-select-solid">
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
                  <select className="form-select form-select-solid">
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
                    type="text"
                    className="form-control form-control-solid"
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
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="https://instagram.com/exemplo"
                  />
                </div>
              </div>
            </div>

            {/*begin::Action */}
            <div className="pb-lg-0 pb-5">
              <button
                type="submit"
                id="kt_add_member_form_submit_button"
                className="btn btn-success fw-bolder fs-6 px-8 py-4 my-3 me-3"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className="indicator-label">Salvar</span>}
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
            {/*end::Action */}
          </form>
          {/*end::Form */}
        </div>
      </div>
    </>
  )
}
