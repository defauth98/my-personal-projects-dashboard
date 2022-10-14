import { Button, Flex, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import ApiStatusAndDb from '../features/ApiStatus/ApiStatusAndDb'
import CreateAPIStatusModal from '../features/ApiStatus/CreateAPIStatusModel'
import Header from '../features/Header/Header'

type ApisStatus = {
  id: number
  link: string
  name: string
}

export default function ApiStatus() {
  const [apis, setApis] = useState<ApisStatus[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  async function getApis() {
    const response = await api.get<ApisStatus[]>('/api-status')

    setApis(response.data)
  }

  async function closeModal() {
    setModalOpen(false)
  }

  useEffect(() => {
    getApis()
  }, [])

  return (
    <>
      <Header />

      <Grid
        margin={['2rem 2.5rem', '2rem auto']}
        templateColumns="1fr 1fr"
        padding="2rem"
        background="#EBEAEA"
        borderRadius="8px"
        gap="2rem"
        maxWidth="960px"
      >
        {apis.map((api) => (
          <ApiStatusAndDb key={api.id} link={api.link} name={api.name} />
        ))}
      </Grid>

      <Flex justifyContent="center" marginTop="1rem">
        <Button onClick={() => setModalOpen(true)}>Adicionar API</Button>
      </Flex>

      <CreateAPIStatusModal
        open={modalOpen}
        closeModal={closeModal}
        getApis={getApis}
      />
    </>
  )
}
