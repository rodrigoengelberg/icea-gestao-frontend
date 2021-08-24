/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { MemberModel } from '../models/MemberModel'
import { getAllMembers } from '../redux/MemberCRUD'
import * as membersSaga from '../redux/MemberRedux'

export function ListPage() {
  const [members, setMembers] = useState<MemberModel[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (members) {
      getAllMembers()
        .then(({ data: members }) => {
          setMembers(members)
          dispatch(membersSaga.actions.fulfillMembers(members))
        })
        .catch(() => {
          alert('Ocorreu um problema ao consultar Membros')
        })
    }
  }, [])

  return (
    <div className="card">
      <div className="card-body p-12">
        <div className="row">
          <div className="d-flex justify-content-between pb-10 flex-column flex-md-row">
            <h1 className="display-6 text-dark fw-bolder mb-10">
              Consulta de Membros
              <span className="d-flex flex-column fs-4 fw-bold text-muted">
                <span>Lista dos membros cadastrados</span>
              </span>
            </h1>
            <div className="d-flex flex-column align-items-md-end px-0">
              <div className="text-center pt-7">
                <Link
                  className="btn btn-primary fw-bolder fs-6 px-7 py-3"
                  to="/members/add"
                >
                  Novo Membro
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*begin::Table */}
        <table className="table table-row-dashed table-hover table-row-gray-300 gy-7">
          <thead>
            <tr className="fw-bolder fs-6 text-gray-800">
              <th>Nome</th>
              <th>E-mail</th>
              <th>Gênero</th>
              <th>Data de nascimento</th>
              <th>Estado civil</th>
              <th>Nascionalidade</th>
            </tr>
          </thead>
          <tbody style={{ cursor: 'pointer' }}>
            {members
              ? members.map((member: MemberModel) => {
                  return (
                    <tr key={member.id}>
                      <td>{member.full_name}</td>
                      <td>{member.email}</td>
                      <td>{member.gender}</td>
                      <td>{member.birth_date}</td>
                      <td>{member.marital_status}</td>
                      <td>{member.nationality}</td>
                    </tr>
                  )
                })
              : 'Não há nenhum membro cadastrado'}
          </tbody>
        </table>
        {/*end::Table */}
      </div>
    </div>
  )
}
