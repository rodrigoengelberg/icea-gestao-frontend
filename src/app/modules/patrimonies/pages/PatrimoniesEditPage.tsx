/*eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PatrimonyForm from '../components/PatrimonyForm'
import { PatrimonyModel } from '../models/PatrimonyModel'
import { getPatrimonyById, update } from '../redux/PatrimoniesCRUD'

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
          accounting_classification: string,
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
