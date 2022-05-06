import { Center, Flex } from '@chakra-ui/react'
import { GithubLogo } from 'phosphor-react'

interface ProjectRepositoryLinkProps {
  repoLink: string
}

export default function ProjectRepositoryLink({
  repoLink,
}: ProjectRepositoryLinkProps) {
  function handleOpenLink() {
    window.open(repoLink, '_blank')
  }

  return (
    <Flex width="100%">
      <Center cursor="pointer" onClick={handleOpenLink}>
        <GithubLogo size={32} />
      </Center>
    </Flex>
  )
}
