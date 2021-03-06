import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import * as Yup from 'yup'
// import { toAbsoluteUrl } from '../../../../_start/helpers'
import { login } from '../redux/AuthCRUD'
import * as auth from '../redux/AuthRedux'

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

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { token } }) => {
            setLoading(false)
            dispatch(auth.actions.login(token))
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('Usuário ou senha estão incorretos')
          })
      }, 1000)
    }
  })

  return (
    <form
      noValidate
      id="kt_login_signin_form"
      className="form w-100"
      onSubmit={formik.handleSubmit}
    >
      {/*begin::Title */}
      <div className="pb-lg-15">
        <h3 className="fw-bolder text-dark display-6">
          Bem vindo ao ICEA Gestão
        </h3>
        <div className="text-muted fw-bold fs-4">
          Novo aqui?
          <div className="text-primary fw-bolder">
            Solicite sua senha a MEAL
          </div>
          {/* {' '}
          <Link
            to="/auth/registration"
            className="text-primary fw-bolder"
            id="kt_login_signin_form_singup_button"
          >
            Create Account
          </Link> */}
        </div>
      </div>
      {/*begin::Title */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <div className="mb-lg-15 alert alert-info">
          <div className="alert-text ">
            Acesso registro a <strong>MEAL ICEA</strong> e convidados.
          </div>
        </div>
      )}

      {/*begin::Form group */}
      <div className="v-row mb-10 fv-plugins-icon-container">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
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
      {/*end::Form group */}

      {/*begin::Form group */}
      <div className="fv-row mb-10 fv-plugins-icon-container">
        <div className="d-flex justify-content-between mt-n5">
          <label className="form-label fs-6 fw-bolder text-dark pt-5">
            Senha
          </label>

          {/* <Link
            to="/auth/forgot-password"
            className="text-primary fs-6 fw-bolder text-hover-primary pt-5"
            id="kt_login_signin_form_password_reset_button"
          >
            Forgot Password ?
          </Link> */}
        </div>
        <input
          type="password"
          autoComplete="off"
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.password}</div>
          </div>
        )}
      </div>
      {/*end::Form group */}

      {/*begin::Action */}
      <div className="pb-lg-0 pb-5">
        <button
          type="submit"
          id="kt_login_signin_form_submit_button"
          className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Acessar</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Carregando...{' '}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        {/* <button
          type="button"
          className="btn btn-light-primary fw-bolder px-8 py-4 my-3 fs-6 mr-3"
        >
          <img
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className="w-20px h-20px me-3"
            alt=""
          />
          Sign in with Google
        </button> */}
      </div>
      {/*end::Action */}
    </form>
  )
}
