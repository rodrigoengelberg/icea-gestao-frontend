/*eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import SmartDataTable from 'react-smart-data-table'
import { MemberModel } from '../models/MemberModel'
import { getAllMembers, getMembersCanVote } from '../redux/MemberCRUD'
import * as membersSaga from '../redux/MemberRedux'

interface IParamsExport {
  data: any
  fileName: any
  fileType: any
}

interface IMemberList {
  id?: string
  name: string
  email?: string
  status?: string
  gender: string
  marital_status?: string
  birth_day?: string
}

const MemberListPage: React.FC = () => {
  const history = useHistory()
  const [members, setMembers] = useState<MemberModel[]>([])
  const dispatch = useDispatch()
  const [membersList, setMembersList] = useState<IMemberList[]>([])
  const [filterValue] = useState<string>('')
  const perPage = 5

  const headers = {
    id: {
      text: 'ID',
      invisible: true
    },
    name: {
      text: 'Nome',
      invisible: false,
      sortable: true,
      filterable: true
    },
    email: {
      text: 'E-mail',
      invisible: false,
      sortable: true,
      filterable: true
    },
    status: {
      text: 'Situação',
      invisible: false,
      sortable: true,
      filterable: true
    },
    gender: {
      text: 'Gênero',
      invisible: false,
      sortable: true,
      filterable: true
    },
    marital_status: {
      text: 'Estado civil',
      invisible: false,
      sortable: true,
      filterable: true
    },
    birth_day: {
      text: 'Aniversário',
      invisible: false,
      sortable: true,
      filterable: true
    }
  }

  const onRowClick = (event: any, { rowData }: any) => {
    history.push('/members/edit/' + rowData.id)
  }

  const handleOnChange = ({ target }: any) => {
    const membersListFiltered = membersList.filter(function (str) { return target.test(str) });
    setMembersList(membersListFiltered ? membersList : membersListFiltered)
  }

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
          const membersList: IMemberList[] = []
          members.forEach(member => {
            const memberList = {
              id: member.id,
              name: member.first_name + ' ' + member.last_name,
              email: member.email,
              status: member.member_spiritual.member_status,
              gender: member.gender,
              marital_status: member.marital_status,
              birth_day: moment(member.birth_date).format('DD/MM/YYYY')
            }
            membersList?.push(memberList)
          })
          setMembersList(membersList)
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
            <input
              type="text"
              className="form-control form-control-solid"
              name="filterValue"
              value={filterValue}
              placeholder="Filter results..."
              onChange={handleOnChange}
            />
            <SmartDataTable
              sortable={true}
              className="table table-row-dashed table-hover table-row-gray-300 gy-7"
              pagination="true"
              headers={headers}
              data={membersList}
              name="members-table"
              perPage={perPage}
              onRowClick={onRowClick}
              paginator={membersList.length < perPage ? () => null : undefined}
            />
            
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberListPage
