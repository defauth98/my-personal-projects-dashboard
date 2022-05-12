import { Center, Flex, Td, Tr, Text } from '@chakra-ui/react'
import { Eye, EyeClosed, Trash, Pencil } from 'phosphor-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../../api/api'
import { ProjectType } from '../dto/Project.dto'
import ProjectLink from './ProjectLink'
import ProjectRepositoryLink from './ProjectReposityLink'

type ProjectItemProps = {
  project: ProjectType
  getProjects: () => void
}

export default function ProjectItem({
  project,
  getProjects,
}: ProjectItemProps) {
  const [isHidden, setIsHidden] = useState(project.hidden)

  const navigation = useNavigate()

  async function handleDeleteProject() {
    await api.delete(`/projects/${project.id}`)
    getProjects()
  }

  async function handleHiddeProject() {
    await api.put(`/projects/${project.id}`, { hidden: !isHidden })
    setIsHidden(!isHidden)
  }

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
          <Center
            onClick={() => navigation(`/editProject/${project.id}`)}
            cursor="pointer"
          >
            <Pencil size={32} />
          </Center>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Center onClick={handleDeleteProject} cursor="pointer">
            <Trash size={32} />
          </Center>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Center onClick={handleHiddeProject} cursor="pointer">
            {isHidden ? <EyeClosed size={32} /> : <Eye size={32} />}
          </Center>
        </Flex>
      </Td>
    </Tr>
  )
}
