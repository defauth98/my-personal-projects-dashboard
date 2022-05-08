import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import ProjectsTable from '../features/projectTable/ProjectTable'
import { useNavigate } from 'react-router-dom'

export default function ProjectList() {
  const navigation = useNavigate()

  function handleGoToCreateProjectPage() {
    navigation('/createProject')
  }

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
