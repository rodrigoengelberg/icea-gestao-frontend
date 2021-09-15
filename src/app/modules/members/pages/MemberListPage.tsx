/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

import { MemberModel } from '../models/MemberModel'
import { getAllMembers } from '../redux/MemberCRUD'
import * as membersSaga from '../redux/MemberRedux'

const MemberListPage: React.FC = () => {
  const history = useHistory()
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

  const selectedMember = (member: MemberModel) => {
    history.push('/members/edit/' + member.id)
  }

  return (
    <>
      <div className="card card-custom shadow">
        <div className="card-header card-header-stretch">
          <div className="card-title pt-6 pb-3">
            <div className="d-flex justify-content-between flex-column flex-md-row">
              <h1 className="display-6 text-dark fw-bolder">
                Consulta de Membros
                <span className="d-flex flex-column fs-4 fw-bold text-muted">
                  <span>Lista dos membros cadastrados</span>
                </span>
              </h1>
            </div>
          </div>
          <div className="card-toolbar pt-12">
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
                        <tr
                          key={member.id}
                          onClick={() => selectedMember(member)}
                        >
                          <td>{member.first_name + ' ' + member.last_name}</td>
                          <td>{member.email}</td>
                          <td>{member.gender}</td>
                          <td className="text-center">
                            {moment(member.birth_date).format('DD/MM/YYYY')}
                          </td>
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
      </div>
    </>
  )
}

export default MemberListPage
