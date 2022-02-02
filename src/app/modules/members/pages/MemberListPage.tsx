/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
// import 'react-data-table-component-extensions/dist/index.css'

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

  const [datatable] = React.useState({
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name'
        }
      },
      {
        label: 'Position',
        field: 'position',
        width: 270
      },
      {
        label: 'Office',
        field: 'office',
        width: 200
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'disabled',
        width: 150
      },
      {
        label: 'Salary',
        field: 'salary',
        sort: 'disabled',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        salary: '$320'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170'
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86'
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433'
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        date: '2008/11/28',
        salary: '$162'
      }
    ]
  })

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
          // members.map(member => setDatatable(member))
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
            <MDBDataTable striped bordered small data={datatable} />

            {/* <table className="table table-row-dashed table-hover table-row-gray-300 gy-7">
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
            </table> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberListPage
