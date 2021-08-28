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
          full_name: string,
          gender: string,
          nationality: string,
          marital_status: string,
          birth_date: string,
          email: string,
          member_details: any,
          setLoading: any,
          setStatus: any,
          setSubmitting: any
        ) => {
          save(
            first_name,
            full_name,
            email,
            gender,
            marital_status,
            nationality,
            birth_date,
            member_details
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
