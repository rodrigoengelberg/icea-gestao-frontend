/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap-v5'
import { Link, useLocation } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl } from '../../helpers'

type Props = {
  show: boolean
  handleClose: () => void
}

const MenuModal: React.FC<Props> = ({ show, handleClose, children }) => {
  const location = useLocation()
  const isFirstRef = useRef(true)
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
    } else {
      handleClose()
    }
  }, [location])

  return (
    <Modal
      className="bg-white"
      id="kt_mega_menu_modal"
      aria-hidden="true"
      tabIndex="-1"
      dialogClassName="modal-fullscreen"
      contentClassName="shadow-none"
      show={show}
    >
      <div className="container">
        <div className="modal-header d-flex align-items-center justify-content-between border-0">
          <div className="d-flex align-items-center">
            {/*begin::Logo */}
            <Link to="/">
              <img
                alt="logo"
                className="h-60px"
                src={toAbsoluteUrl('/media/logos/logo-default.svg')}
              />
            </Link>
            {/*end::Logo */}
          </div>

          {/*begin::Close */}
          <div
            className="btn btn-icon btn-sm btn-light-primary ms-2"
            onClick={handleClose}
          >
            <KTSVG
              path="/media/icons/duotone/Navigation/Close.svg"
              className="svg-icon-2"
            />
          </div>
          {/*end::Close */}
        </div>
        <div className="modal-body">
          {/*begin::Row */}
          <div className="row py-10 g-5">
            {/*begin::Column */}
            <div className="col-lg-6 pe-lg-25">{children}</div>
            {/*end::Column */}

            {/*begin::Column */}
            <div className="col-lg-6">
              <h3 className="fw-bolder mb-8">Acessos rápidos</h3>

              {/*begin::Row */}
              <div className="row g-5">
                <div className="col-sm-4">
                  <a
                    href="#"
                    className="card card-custom bg-light-success hoverable min-h-125px shadow-none mb-5"
                  >
                    <div className="card-body d-flex flex-column flex-center text-center">
                      <h3 className="fs-3 mb-2 text-dark fw-bolder">
                        Entradas
                      </h3>
                      <p className="mb-0 text-gray-600">
                        R$ 3.590,00 nesse mês
                      </p>
                    </div>
                  </a>
                </div>
                <div className="col-sm-4">
                  <a
                    href="#"
                    className="card card-custom bg-light-danger hoverable min-h-125px shadow-none mb-5"
                  >
                    <div className="card-body d-flex flex-column flex-center text-center">
                      <h3 className="fs-3 mb-2 text-dark fw-bolder">Saídas</h3>
                      <p className="mb-0 text-gray-600">
                        R$ 2.119,00 nesse mês
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              {/*end::Row */}

              {/*begin::Row */}
              <div className="row g-5">
                <div className="col-sm-4">
                  <a
                    href="#"
                    className="card card-custom card-stretch mb-5 bg-light-info hoverable shadow-none min-h-250px"
                  >
                    <div className="card-body d-flex flex-column p-0">
                      <div className="d-flex flex-column flex-center text-center px-5 pt-10">
                        <h3 className="fs-3 mb-2 text-dark fw-bolder">
                          Membros
                        </h3>
                        <p className="mb-0 text-gray-600">
                          8 Membros necessitam completar cadastro
                        </p>
                      </div>
                      <div
                        className="flex-grow-1 bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom card-rounded-bottom"
                        style={{
                          backgroundImage: `url('${toAbsoluteUrl(
                            '/media/illustrations/terms-1.png'
                          )}')`
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>
              {/*end::Row */}
            </div>
            {/*end::Column */}
          </div>
          {/*end::Row */}
        </div>
      </div>
    </Modal>
  )
}

export { MenuModal }
