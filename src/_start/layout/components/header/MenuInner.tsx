import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from './MenuItem'

export function MenuInner() {
  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <h3 className="fw-bolder mb-5">Dashboards</h3>
          <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
            <li className="menu-item">
              <MenuItem to="/dashboard" title="Home" />
            </li>
            {/* <li className="menu-item">
              <MenuItem to="/extended" title="Extended" free={true} />
            </li>
            <li className="menu-item">
              <MenuItem to="/light" title="Light" />
            </li>
            <li className="menu-item">
              <MenuItem to="/compact" title="Compact" free={true} />
            </li> */}
          </ul>
        </div>
        <div className="col-sm-4">
          <h3 className="fw-bolder mb-5">Gestão</h3>
          <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
            <li className="menu-item">
              <MenuItem to="/mail" title="Membros" />
            </li>
            <li className="menu-item">
              <MenuItem to="/general/faq" title="Financeira" />
            </li>
            <li className="menu-item">
              <MenuItem to="/general/pricing" title="Patrimônio" />
            </li>
            <li className="menu-item">
              <MenuItem to="/general/pricing" title="Calendário" />
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <h3 className="fw-bolder mb-5">Espiritual</h3>
          <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
            <li className="menu-item">
              <MenuItem to="/mail" title="Pedidos de oração" />
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <h3 className="fw-bolder mb-5">Documentos</h3>
          <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
            <li className="menu-item">
              <Link className="menu-link ps-0 py-2" to="/profile/overview">
                Atas
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link ps-0 py-2" to="/profile/overview">
                Ofícios
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link ps-0 py-2" to="/profile/overview">
                Convocações
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link ps-0 py-2" to="/profile/overview">
                Estatuto
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="col-sm-4">
          <h3 className="fw-bolder mb-5">Relatórios</h3>
          <ul className="menu menu-column menu-fit menu-rounded menu-gray-600 menu-hover-primary menu-active-primary fw-bold fs-6 mb-10">
            <li className="menu-item">
              <Link className="menu-link ps-0 py-2" to="/docs/getting-started">
                Financeiro
              </Link>
            </li>
            <li className="menu-item">
            <Link className="menu-link ps-0 py-2" to="/docs/getting-started">
                Membros
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  )
}
