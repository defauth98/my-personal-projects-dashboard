import { Box, GridItem, Heading, Image } from '@chakra-ui/react'
import { ProjectType } from '../../../types/Project.dto'

interface ProjectGridItemProps {
  project: ProjectType
}

export default function ProjectGridItem({ project }: ProjectGridItemProps) {
  return (
    <GridItem
      h="13rem"
      w="15rem"
      borderRadius="0.8rem"
      width={{ base: '15rem' }}
      height={{ base: '13rem' }}
      overflow={{ base: 'hidden' }}
      background="black"
      border="4px solid #ccc"
      cursor="pointer"
    >
      <Image
        src={project.thumbnailPath}
        alt={project.name}
        placeholder="blurred"
        width={{ base: '15rem' }}
        height={{ base: '10rem' }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={{ base: '2.5rem' }}
        padding="0 0.8rem"
      >
        <Heading fontSize={{ base: '1rem' }} color="white">
          {project.name}
        </Heading>
      </Box>
    </GridItem>
  )
}
