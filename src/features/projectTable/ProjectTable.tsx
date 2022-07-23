import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { ProjectType } from '../../types/Project.dto'
import ProjectItem from './components/ProjectItem'

interface ProjectTableProps {
  projects: ProjectType[]
  getProjects: () => {}
}

export default function ProjectsTable({
  projects,
  getProjects,
}: ProjectTableProps) {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blackAlpha">
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
