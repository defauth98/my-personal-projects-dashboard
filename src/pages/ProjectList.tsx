import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { useAuth } from '../contexts/authContext'
import Header from '../features/Header/Header'
import ProjectsGrid from '../features/projectGrid/ProjectGrid'
import ProjectsTable from '../features/projectTable/ProjectTable'
import { ProjectType } from '../types/Project.dto'

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [viewMode, setViewMode] = useState('table')

  async function getProjects() {
    const request = await api.get('/projects')

    setProjects(request.data)
  }

  useEffect(() => {
    getProjects()
  }, [])

  const navigation = useNavigate()

  function handleGoToCreateProjectPage() {
    navigation('/createProject')
  }

  const { user, retrieveDataFromLocalStorage } = useAuth()

  useEffect(() => {
    if (user === null) {
      retrieveDataFromLocalStorage()
    }
  }, [])

  return (
    <Box backgroundColor="#181A1B" color="white" minHeight="100vh">
      <Header />
      <Container maxW="container.xl" paddingTop="1rem">
        <Flex justifyContent="space-between">
          <Heading as="h1" size="md" margin="1rem 1.5rem">
            Projetos no portfólio
          </Heading>

          <Flex>
            <Checkbox
              onChange={() =>
                viewMode === 'table'
                  ? setViewMode('grid')
                  : setViewMode('table')
              }
            >
              Grid view
            </Checkbox>

            <Button
              margin="0.5rem 1.5rem"
              onClick={handleGoToCreateProjectPage}
              variant="solid"
              color="black"
            >
              Adicionar
            </Button>
          </Flex>
        </Flex>
        {user && viewMode === 'grid' && <ProjectsGrid projects={projects} />}
        {user && viewMode === 'table' && (
          <ProjectsTable projects={projects} getProjects={getProjects} />
        )}
      </Container>
    </Box>
  )
}
