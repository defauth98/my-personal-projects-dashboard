import { Center, Flex, Td, Text, Tr } from '@chakra-ui/react'
import { Eye, EyeClosed, Pencil, Trash } from 'phosphor-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../../../api/api'
import { ProjectType } from '../../../types/Project.dto'
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
    const formData = new FormData()

    formData.append('hidden', isHidden ? 'false' : 'true')

    await api.put(`/projects/${project.id}`, formData)

    setIsHidden(!isHidden)
  }

  return (
    <Tr>
      <Td>
        <Flex>
          {project && project.faviconLink && (
            <img src={project.faviconLink} alt={project.name} width="20px" />
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
