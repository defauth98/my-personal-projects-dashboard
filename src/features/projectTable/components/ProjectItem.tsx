import { Center, Flex, Td, Tr, Text } from '@chakra-ui/react'
import { Eye, Trash, Pencil } from 'phosphor-react'
import { ProjectType } from '../dto/Project.dto'
import ProjectLink from './ProjectLink'
import ProjectRepositoryLink from './ProjectReposityLink'

export default function ProjectItem({ project }: { project: ProjectType }) {
  return (
    <Tr>
      <Td>
        <Flex>
          {project && project.favicon && (
            <img src={project.favicon} alt={project.name} width="20px" />
          )}
          <Text paddingLeft="0.5rem">{project.name}</Text>
        </Flex>
      </Td>
      <Td>{project.description.slice(0, 30) + '...'}</Td>
      <Td>
        <ProjectLink link={project.link} />
      </Td>
      <Td>
        <ProjectRepositoryLink repoLink={project.repoLink} />
      </Td>
      <Td>
        <Flex>
          <Center>
            <Pencil size={32} />
          </Center>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Center>
            <Trash size={32} />
          </Center>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Center>
            <Eye size={32} />
          </Center>
        </Flex>
      </Td>
    </Tr>
  )
}
