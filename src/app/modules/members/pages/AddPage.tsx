import React, { useState } from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'
import { Moment } from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Senha é obrigatória')
})

const initialValues = {
  email: '',
  password: ''
}

export function AddPage() {
  const [loading] = useState(false)

  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(null)

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
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
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            {/*begin::Form group */}
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-4">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Primeiro nome
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Primeiro nome"
                  />
                </div>
              </div>
              <div className="col-md-4 col-lg-12 col-xl-6">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Nome completo"
                  />
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
                  <select className="form-select form-select-solid">
                    <option>Selecione</option>
                    <option value="0">Masculino</option>
                    <option value="1">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4 col-lg-12 col-xl-4">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Estado civil
                  </label>
                  <select className="form-select form-select-solid">
                    <option>Selecione</option>
                    <option value="0">Masculino</option>
                    <option value="1">Feminino</option>
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
                  <select className="form-select form-select-solid">
                    <option>Selecione</option>
                    <option value="0">Masculino</option>
                    <option value="1">Feminino</option>
                  </select>
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
                    <option value="0">Masculino</option>
                    <option value="1">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4 col-lg-12 col-xl-4">
                <div className="mb-10">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Escolaridade
                  </label>
                  <select className="form-select form-select-solid">
                    <option>Selecione</option>
                    <option value="0">Masculino</option>
                    <option value="1">Feminino</option>
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
                id="kt_login_signin_form_submit_button"
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
