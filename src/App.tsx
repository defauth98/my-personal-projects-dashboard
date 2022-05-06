import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import ProjectList from './features/projectTable/ProjectTable'

function App() {
  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between">
        <Heading as="h1" size="md" margin="1rem 1.5rem">
          Projetos no portfólio
        </Heading>

        <Button margin="0.5rem 1.5rem">Adicionar</Button>
      </Flex>

      <ProjectList />
    </Container>
  )
}

export default App
