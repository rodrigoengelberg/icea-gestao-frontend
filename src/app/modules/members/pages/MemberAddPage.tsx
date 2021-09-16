import React from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { save } from '../redux/MemberCRUD'
import MemberForm from '../components/MemberForm'

const MemberAddPage: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <MemberForm
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
          setLoading: any,
          setStatus: any,
          setSubmitting: any
        ) => {
          setLoading(true)
          save(
            first_name,
            last_name,
            email,
            gender,
            marital_status,
            nationality,
            birth_date,
            occupation,
            schooling,
            facebook_link,
            instagram_link,
            member_contact
          )
            .then(() => {
              toast.success('Membro ICEA salvo com sucesso!')
              history.push('/members/list')
            })
            .catch(() => {
              setLoading(false)
              setSubmitting(false)
              setStatus('Ocorreu um problema ao salvar o membro ICEA')
            })
        }}
      />
    </>
  )
}

export default MemberAddPage
