import React from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { save } from '../redux/PatrimoniesCRUD'
import PatrimonyForm from '../components/PatrimonyForm'

const PatrimoniesAddPage: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <PatrimonyForm
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
          save(
            description,
            accounting_classification,
            localization,
            observations
          )
            .then(() => {
              toast.success('Patrimônio ICEA salvo com sucesso!')
              history.push('/patrimonies/list')
            })
            .catch(() => {
              setLoading(false)
              setSubmitting(false)
              setStatus('Ocorreu um problema ao salvar o patrimônio ICEA')
            })
        }}
      />
    </>
  )
}

export default PatrimoniesAddPage
