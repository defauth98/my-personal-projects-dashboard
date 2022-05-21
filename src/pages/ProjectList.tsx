import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import ProjectsTable from '../features/projectTable/ProjectTable'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { useEffect } from 'react'

export default function ProjectList() {
  const navigation = useNavigate()

  function handleGoToCreateProjectPage() {
    navigation('/createProject')
  }

  const { user, retrieveDataFromLocalStorage } = useAuth()

  useEffect(() => {
    if (user === null) {
      retrieveDataFromLocalStorage()
    }
  }, [user])

  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between">
        <Heading as="h1" size="md" margin="1rem 1.5rem">
          Projetos no portfólio
        </Heading>

        <Button margin="0.5rem 1.5rem" onClick={handleGoToCreateProjectPage}>
          Adicionar
        </Button>
      </Flex>
      <ProjectsTable />
    </Container>
  )
}
