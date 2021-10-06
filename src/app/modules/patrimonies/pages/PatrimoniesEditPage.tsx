/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'

import { update, getPatrimonyById } from '../redux/PatrimoniesCRUD'
import PatrimonyForm from '../components/PatrimonyForm'
import { PatrimonyModel } from '../models/PatrimonyModel'

const PatrimoniesEditPage: React.FC = () => {
  const { id }: { id: string } = useParams()
  const history = useHistory()

  const [member, setMember] = useState<PatrimonyModel>()

  useEffect(() => {
    getPatrimonyById(id)
      .then(({ data: member }) => {
        setMember(member)
      })
      .catch(() => {
        alert('Ocorreu um problema ao consultar o Membro ICEA')
      })
  }, [])

  return (
    <>
      <PatrimonyForm
        member={member}
        onSubmit={(
          first_name: string,
          last_name: string,
          gender: string,
          nationality: string,
          marital_status: string,
          birth_date: string,
          email: string,
          occupation: string,
          schooling: string,
          facebook_link: string,
          instagram_link: string,
          member_contact: any,
          member_spiritual: any,
          setLoading: any,
          setStatus: any,
          setSubmitting: any
        ) => {
          setLoading(true)
          update(
            id,
            first_name,
            last_name,
            email,
            gender,
            marital_status,
            nationality,
            moment(birth_date).toISOString(),
            occupation,
            schooling,
            facebook_link,
            instagram_link,
            member_contact,
            member_spiritual
          )
            .then(() => {
              toast.success('Patrimônio ICEA alterado com sucesso!')
              history.push('/patrimonies/list')
            })
            .catch(() => {
              setLoading(false)
              setSubmitting(false)
              setStatus('Ocorreu um problema ao alterar o patrimônio ICEA')
            })
        }}
      />
    </>
  )
}

export default PatrimoniesEditPage
