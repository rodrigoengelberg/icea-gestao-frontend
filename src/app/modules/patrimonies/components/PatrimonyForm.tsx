/*eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { useFormik } from 'formik'
import 'moment/locale/pt-br'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { KTSVG } from '../../../../_start/helpers/components/KTSVG'
import { AccountingClassificationModel } from '../models/AccountingClassificationModel'
import {
  deletePatrimony,
  getAccountingClassification
} from '../redux/PatrimoniesCRUD'

interface IPatrimonyProps {
  onSubmit: any
  patrimony?: IMemberState
}

interface IMemberState {
  id?: string
  description: string
  accounting_classification?: string
  localization?: string
  observations?: string
}

const patrimonySchema = Yup.object().shape({
  id: Yup.string(),
  description: Yup.string()
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres')
    .required('Descrição é obrigatório'),
  accounting_classification: Yup.string(),
  localization: Yup.string(),
  observations: Yup.string()
})

const initialValues = {
  id: '',
  description: '',
  accounting_classification: '',
  localization: '',
  observations: ''
}

const PatrimonyForm: React.FC<IPatrimonyProps> = props => {
  const [loading, setLoading] = useState(false)
  const [accountingsClassifications, setAccountingsClassifications] = useState<
    AccountingClassificationModel[]
  >([])

  const history = useHistory()

  const onClickDelete = () => {
    deletePatrimony(formik.values.id)
      .then(() => {
        toast.success('Patrimônio ICEA excluído com sucesso!')
        history.replace('/patrimonies/list')
      })
      .catch(() => {
        formik.setStatus('Ocorreu um problema ao alterar o patrimônio ICEA')
      })
  }

  useEffect(() => {
    getAccountingClassification()
      .then(({ data: accountingsClassifications }) => {
        setAccountingsClassifications(accountingsClassifications)
      })
      .catch(() => {
        formik.setStatus(
          'Ocorreu um problema ao consultar a Classifição de Patrimônio'
        )
      })
  }, [accountingsClassifications])

  const formik = useFormik({
    initialValues,
    validationSchema: patrimonySchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setTimeout(() => {
        props.onSubmit(
          values.description,
          values.accounting_classification,
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
                Cadastro de Patrimônio
                <span className="d-flex flex-column fs-4 fw-bold text-muted">
                  <span>Gerenciar o cadastro de patrimônios da ICEA</span>
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
                        Descrição
                      </label>
                      <input
                        placeholder="Descrição"
                        {...formik.getFieldProps('description')}
                        className={clsx(
                          'form-control form-control-lg form-control-solid',
                          {
                            'is-invalid':
                              formik.touched.description &&
                              formik.errors.description
                          },
                          {
                            'is-valid':
                              formik.touched.description &&
                              !formik.errors.description
                          }
                        )}
                        type="text"
                        name="description"
                        autoComplete="off"
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.description}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-12 col-xl-4">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Classificação
                      </label>
                      <select
                        id="marital_status"
                        className="form-select form-select-solid"
                        {...formik.getFieldProps('accounting_classification')}
                      >
                        {accountingsClassifications
                          ? accountingsClassifications.map(
                              (
                                accountingClassification: AccountingClassificationModel
                              ) => {
                                return (
                                  <option
                                    key={
                                      accountingClassification.accounting_classification
                                    }
                                    value={
                                      accountingClassification.accounting_classification_name
                                    }
                                  >
                                    {
                                      accountingClassification.accounting_classification_name
                                    }
                                  </option>
                                )
                              }
                            )
                          : ''}
                      </select>
                    </div>
                  </div>
                </div>
                {/*end::Form group */}

                {/*begin::Form group */}
                <div className="row">
                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Localização
                      </label>
                      <input
                        id="localization"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('localization')}
                        placeholder="Local do patrimônio"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-lg-12 col-xl-6">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-bolder text-dark">
                        Observação
                      </label>
                      <input
                        id="observations"
                        type="text"
                        className="form-control form-control-solid"
                        {...formik.getFieldProps('observations')}
                        placeholder="Informar uma observação"
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
                  {props.patrimony && props.patrimony.id && (
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
              <p>Você realmente deseja excluir este patrimônio?</p>
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

export default PatrimonyForm
