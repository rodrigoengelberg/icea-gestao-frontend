import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EngageWidget5 } from '../../../../_start/partials/widgets'
import { CreateAppModal } from '../_modals/create-app-stepper/CreateAppModal'

export const StartDashboardPage: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      {/*begin::Row */}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-4">
          <EngageWidget5 className="card-stretch mb-5 mb-xxl-8">
            {/*begin::Action */}
            <div className="text-center pt-7">
              <Link
                className="btn btn-primary fw-bolder fs-6 px-7 py-3"
                to="/members/"
              >
                Acessar
              </Link>
            </div>
            {/*end::Action */}
          </EngageWidget5>
        </div>
      </div>
      {/*end::Row */}

      {/*begin::Modals */}
      <CreateAppModal show={show} handleClose={() => setShow(false)} />
      {/*end::Modals */}
    </>
  )
}
