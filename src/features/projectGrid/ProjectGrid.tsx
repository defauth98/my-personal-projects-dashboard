import { Container, Grid } from '@chakra-ui/react'
import { ProjectType } from '../../types/Project.dto'
import ProjectGridItem from './components/ProjectGridItem'

interface ProjectGridProps {
  projects: ProjectType[]
}

export default function ProjectsGrid({ projects }: ProjectGridProps) {
  return (
    <Container maxW="container.xl">
      <Grid templateColumns='repeat(4, 1fr)' gap={6} marginTop="20px" marginBottom="50px">
        {projects?.map(project => <ProjectGridItem key={project.id} project={project}/>)}
      </Grid>
    </Container>
  )
}
