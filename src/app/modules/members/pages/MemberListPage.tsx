/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import DataTable from 'react-data-table-component'
import 'react-data-table-component-extensions/dist/index.css'

import { MemberModel } from '../models/MemberModel'
import { getAllMembers, getMembersCanVote } from '../redux/MemberCRUD'
import * as membersSaga from '../redux/MemberRedux'

interface IParamsExport {
  data: any
  fileName: any
  fileType: any
}

const MemberListPage: React.FC = () => {
  // const history = useHistory()
  const [members, setMembers] = useState<MemberModel[]>([])
  const dispatch = useDispatch()
  let dataTable: MemberModel[] = []

  // const columns = [
  //   {
  //     name: 'Nome',
  //     selector: (row: MemberModel) => row.first_name,
  //     sortable: true
  //   },
  //   {
  //     name: 'E-mail',
  //     selector: (row: MemberModel) => row.email,
  //     sortable: true
  //   },
  //   {
  //     name: 'Situação',
  //     selector: (row: MemberModel) =>
  //       row.member_spiritual && row.member_spiritual.member_status.length > 0
  //         ? row.member_spiritual.member_status
  //         : 'Não informado',
  //     sortable: true
  //   },
  //   {
  //     name: 'Gênero',
  //     selector: (row: MemberModel) => row.gender,
  //     sortable: true
  //   },
  //   {
  //     name: 'Situação',
  //     selector: (row: MemberModel) => row.member_spiritual,
  //     sortable: true
  //   },
  //   {
  //     name: 'Nascionalidade',
  //     selector: (row: MemberModel) => row.nationality,
  //     sortable: true
  //   }
  // ]

  const exportToCsv = () => {
    let membersVote: MemberModel[]

    getMembersCanVote()
      .then(({ data: members }) => {
        membersVote = members
        const headers = ['Nome, Sobrenome, Data de Nascimento']
        const membersCSV = membersVote.reduce<Array<string>>((acc, member) => {
          const { first_name, last_name, birth_date } = member
          acc.push([first_name, last_name, birth_date].join(','))
          return acc
        }, [])

        downloadFile({
          data: [...headers, ...membersCSV].join('\n'),
          fileName: 'membrosVotantes.csv',
          fileType: 'text/csv'
        })
      })
      .catch(() => {
        alert('Ocorreu um problema ao imprimir Membors Votantes')
      })
  }

  useEffect(() => {
    if (members) {
      getAllMembers()
        .then(({ data: members }) => {
          setMembers(members)
          members.map(member => dataTable.push(member))
          dispatch(membersSaga.actions.fulfillMembers(members))
        })
        .catch(() => {
          alert('Ocorreu um problema ao consultar Membros')
        })
    }
  }, [])

  // const selectedMember = (member: MemberModel) => {
  //   history.push('/members/edit/' + member.id)
  // }

  const downloadFile = ({ data, fileName, fileType }: IParamsExport) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    a.dispatchEvent(clickEvt)
    a.remove()
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
          <div className="card-toolbar pt-12 pb-6">
            <button
              type="button"
              id="kt_add_member_form_pdf_button"
              className="btn btn-secondary fw-bolder fs-6 px-7 py-3 me-3"
              onClick={exportToCsv}
            >
              <span className="indicator-label">Membros Assembleia</span>
            </button>
            <Link
              className="btn btn-primary fw-bolder fs-6 px-7 py-3"
              to="/members/add"
            >
              Novo Membro
            </Link>
          </div>

          <div className="card-body">
            {/*begin::Table */}

            {/* {dataTable && dataTable.length > 0 ? (
              <DataTable
                columns={columns}
                data={dataTable}
                noHeader
                defaultSortFieldId="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            ) : (
              <div>Não há membros cadastrados</div>
            )} */}

            <table className="table table-row-dashed table-hover table-row-gray-300 gy-7">
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Situação</th>
                  <th>Gênero</th>
                  <th>Estado civil</th>
                  <th>Nascionalidade</th>
                </tr>
              </thead>
              <tbody style={{ cursor: 'pointer' }}>
                {members && members.length > 0 ? (
                  members.map((member: MemberModel) => {
                    return (
                      <tr
                        key={member.id}
                        onClick={() => selectedMember(member)}
                      >
                        <td>{member.first_name + ' ' + member.last_name}</td>
                        <td>{member.email}</td>
                        <td>
                          {member.member_spiritual &&
                          member.member_spiritual.member_status.length > 0
                            ? member.member_spiritual.member_status
                            : 'Não informado'}
                        </td>
                        <td>{member.gender}</td>
                        <td>{member.marital_status}</td>
                        <td>{member.nationality}</td>
                      </tr>
                    )
                  })
                ) : (
                  <div>Não há membros cadastrados</div>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default MemberListPage
