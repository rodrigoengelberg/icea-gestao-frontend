/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { PatrimonyModel } from '../models/PatrimonyModel'
import { getAllPatrimony } from '../redux/PatrimoniesCRUD'
import * as patrimoniesSaga from '../redux/PatrimoniesRedux'

const PatrimoniesListPage: React.FC = () => {
  const history = useHistory()
  const [patrimonies, setPatrimonies] = useState<PatrimonyModel[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (patrimonies) {
      getAllPatrimony()
        .then(({ data: patrimonies }) => {
          setPatrimonies(patrimonies)
          dispatch(patrimoniesSaga.actions.fulfillPatrimonies(patrimonies))
        })
        .catch(() => {
          alert('Ocorreu um problema ao consultar Patrimônios')
        })
    }
  }, [])

  const selectedPatrimony = (patrimony: PatrimonyModel) => {
    history.push('/patrimonies/edit/' + patrimony.id)
  }

  return (
    <>
      <div className="card card-custom shadow">
        <div className="card-header card-header-stretch">
          <div className="card-title pt-6 pb-3">
            <div className="d-flex justify-content-between flex-column flex-md-row">
              <h1 className="display-6 text-dark fw-bolder">
                Consulta de Patrimônios
                <span className="d-flex flex-column fs-4 fw-bold text-muted">
                  <span>Lista dos patrimônios cadastrados</span>
                </span>
              </h1>
            </div>
          </div>
          <div className="card-toolbar pt-12 pb-6">
            <Link
              className="btn btn-primary fw-bolder fs-6 px-7 py-3"
              to="/members/add"
            >
              Novo Membro
            </Link>
          </div>
          <div className="card-body">
            {/*begin::Table */}
            <table className="table table-row-dashed table-hover table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Descrição</th>
                  <th>Classificação</th>
                  <th>Localização</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody style={{ cursor: 'pointer' }}>
                {patrimonies
                  ? patrimonies.map((patrimony: PatrimonyModel) => {
                      return (
                        <tr
                          key={patrimony.id}
                          onClick={() => selectedPatrimony(patrimony)}
                        >
                          <td>{patrimony.description}</td>
                          <td>{patrimony.accounting_classification_name}</td>
                          <td>{patrimony.localization}</td>
                          <td>{patrimony.observations}</td>
                        </tr>
                      )
                    })
                  : 'Não há nenhum patrimônio cadastrado'}
              </tbody>
            </table>
            {/*end::Table */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PatrimoniesListPage
