import React from 'react'

export function ListPage() {
  return (
    <div className="card">
      <div className="card-body p-12">
        <div className="row mb-12">
          <div className="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row">
            <h1 className="display-8 text-dark fw-bolder mb-10">
              Consulta de Membros
            </h1>
            <div className="d-flex flex-column align-items-md-end px-0">
              {/*begin::Logo */}
              {/*end::Logo */}
              <span className="d-flex flex-column align-items-md-end fs-4 fw-bold text-muted">
                <span>Lista dos membros cadastrados</span>
              </span>
            </div>
          </div>
        </div>

        {/*begin::Table */}
        <table className="table table-row-dashed table-row-gray-300 gy-7">
          <thead>
            <tr className="fw-bolder fs-6 text-gray-800">
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Data de nascimento</th>
              <th>Estado Civil</th>
              <th>Nascionalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
            </tr>
            <tr>
              <td>Garrett Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
              <td>$170,750</td>
            </tr>
          </tbody>
        </table>
        {/*end::Table */}
      </div>
    </div>
  )
}
