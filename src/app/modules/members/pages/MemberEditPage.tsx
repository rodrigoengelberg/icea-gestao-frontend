/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'

import { update, getMemberById } from '../redux/MemberCRUD'
import MemberForm from '../components/MemberForm'
import { MemberModel } from '../models/MemberModel'

const MemberEditPage: React.FC = () => {
  const { id }: { id: string } = useParams()
  const history = useHistory()

  const [member, setMember] = useState<MemberModel>()

  useEffect(() => {
    getMemberById(id)
      .then(({ data: member }) => {
        setMember(member)
      })
      .catch(() => {
        alert('Ocorreu um problema ao consultar o Membro ICEA')
      })
  }, [])

  return (
    <>
      <MemberForm
        member={member}
        onSubmit={(
          first_name: string,
          full_name: string,
          gender: string,
          nationality: string,
          marital_status: string,
          birth_date: string,
          email: string,
          occupation: string,
          schooling: string,
          facebook_link: string,
          instagram_link: string,
          setLoading: any,
          setStatus: any,
          setSubmitting: any
        ) => {
          update(
            id,
            first_name,
            full_name,
            email,
            gender,
            marital_status,
            nationality,
            moment(birth_date).toISOString(),
            occupation,
            schooling,
            facebook_link,
            instagram_link
          )
            .then(() => {
              toast.success('Membro ICEA alterado com sucesso!')
              history.push('/members/list')
            })
            .catch(() => {
              setLoading(false)
              setSubmitting(false)
              setStatus('Ocorreu um problema ao alterar o membro ICEA')
            })
        }}
      />
    </>
  )
}

export default MemberEditPage
