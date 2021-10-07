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

  const [patrimony, setPatrimony] = useState<PatrimonyModel>()

  useEffect(() => {
    getPatrimonyById(id)
      .then(({ data: patrimony }) => {
        setPatrimony(patrimony)
      })
      .catch(() => {
        alert('Ocorreu um problema ao consultar o Membro ICEA')
      })
  }, [])

  return (
    <>
      <PatrimonyForm
        patrimony={patrimony}
        onSubmit={(
          description: string,
          accounting_classification: number,
          accounting_classification_name: string,
          localization: string,
          observations: string,
          setLoading: any,
          setStatus: any,
          setSubmitting: any
        ) => {
          setLoading(true)
          update(
            id,
            description,
            accounting_classification,
            accounting_classification_name,
            localization,
            observations
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
