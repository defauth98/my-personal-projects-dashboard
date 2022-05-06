import { Center, Flex } from '@chakra-ui/react'
import { Link } from 'phosphor-react'

interface ProjectLinkProps {
  link: string
}

export default function ProjectLink({ link }: ProjectLinkProps) {
  function handleOpenLink() {
    window.open(link, '_blank')
  }

  return (
    <Flex width="100%">
      <Center cursor="pointer" onClick={handleOpenLink}>
        <Link size={32} />
      </Center>
    </Flex>
  )
}
