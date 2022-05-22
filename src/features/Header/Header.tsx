import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react'
import { SignOut } from 'phosphor-react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/authContext'

export default function Header() {
  const navigator = useNavigate()
  const { logout } = useAuth()

  function handleOpenGithubRepository() {
    window.open(
      'https://github.com/defauth98/my-personal-projects-dashboard',
      '_blank'
    )
  }

  function handleOpenLinkedinProfile() {
    window.open('https://www.linkedin.com/in/daniel-ribeiro-vassao/', '_blank')
  }

  function handleNavigateToProjectList() {
    navigator('/projects')
  }

  return (
    <Box background="gray.800">
      <Container
        maxW="container.xl"
        height="50px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 40px"
      >
        <Heading
          as="h5"
          size="sm"
          color="white"
          onClick={handleNavigateToProjectList}
          cursor="pointer"
        >
          My personal projects
        </Heading>
        <Flex width="15%" justifyContent="space-between">
          <Box>
            <Image
              src="/github.png"
              width="28px"
              onClick={handleOpenGithubRepository}
              cursor="pointer"
            />
          </Box>
          <Box onClick={handleOpenLinkedinProfile} cursor="pointer">
            <Image src="/linkedin.png" width="28px" />
          </Box>
          <Box onClick={logout}>
            <SignOut size={28} color="white" cursor="pointer" />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
