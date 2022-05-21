import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import ProjectItem from './components/ProjectItem'
import { ProjectType } from './dto/Project.dto'

export default function ProjectsTable() {
  const [projects, setProjects] = useState<ProjectType[]>([])

  async function getProjects() {
    const request = await api.get('/projects')

    setProjects(request.data)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Descrição</Th>
            <Th>link</Th>
            <Th>repoLink</Th>
            <Th>Editar</Th>
            <Th>Excluir</Th>
            <Th>Ocultar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              getProjects={getProjects}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
