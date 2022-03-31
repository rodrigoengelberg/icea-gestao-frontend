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
  const [membersListFiltered, setMembersListFiltered] = useState<IMemberList[]>(
    []
  )
  const [filterValue, setFilterValue] = useState<string>('')
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
    const searchString = target.value

    if (!searchString || typeof searchString !== 'string') {
      setFilterValue(searchString)
      setMembersList(membersList)
      setMembersListFiltered(membersList)
      dispatch(membersSaga.actions.fulfillMembers(members))
      return false
    }

    const searchLower = searchString.toLowerCase().trim()

    const membersListFilteredReturn = membersList.filter(member => {
      if (member.name.toLowerCase().includes(searchLower)) {
        return true
      }

      if (member.email?.toLowerCase().includes(searchLower)) {
        return true
      }

      //now we search in albums as well; we store values in an array
      // let filteredAlbums = band.albums.filter(album => {
      //   if (album.name.toLowerCase().includes(searchLower)) {
      //     return true //this is a return for albums
      //   }

      //   return false //this is a return for albums
      // })

      // if (filteredAlbums.length > 0) {
      //   return true
      // }

      return false
    })

    setFilterValue(searchString)
    setMembersListFiltered(membersListFilteredReturn)
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
          setMembersListFiltered(membersList)
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
          <input
            type="text"
            className="form-control form-control-solid"
            name="filterValue"
            value={filterValue}
            placeholder="Buscar por Nome ou Email"
            onChange={handleOnChange}
          />
          <div className="card-body">
            <SmartDataTable
              sortable={true}
              className="table table-row-dashed table-hover table-row-gray-300 gy-7"
              pagination="true"
              headers={headers}
              data={membersListFiltered}
              name="members-table"
              perPage={perPage}
              onRowClick={onRowClick}
              paginator={
                membersListFiltered.length < perPage ? () => null : undefined
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberListPage
