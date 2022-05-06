import { Center, Flex, Td, Tr, Text } from '@chakra-ui/react'
import { Eye, Trash, Pencil } from 'phosphor-react'
import ProjectLink from './ProjectLink'
import ProjectRepositoryLink from './ProjectReposityLink'

interface ProjectItemProps {
  project: {
    id: number
    favicon?: string
    title: string
    description: string
    link: string
    repoLink: string
  }
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Tr>
      <Td>
        <Flex>
          {project && project.favicon && (
            <img src={project.favicon} alt={project.title} width="20px" />
          )}
          <Text paddingLeft="0.5rem">{project.title}</Text>
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
