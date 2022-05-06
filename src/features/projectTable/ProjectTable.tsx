import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import ProjectItem from './components/ProjectItem'

import projectList from './projectsData'

export default function ProjectList() {
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
          {projectList.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
