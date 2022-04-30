import { Button, Container, Input } from '@chakra-ui/react'

function App() {
  return (
    <Container
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Input marginBottom="0.6rem" placeholder="email@mail.com" />
      <Input marginBottom="0.6rem" placeholder="*********" />
      <Button width="100%" colorScheme="cyan">
        Login
      </Button>
    </Container>
  )
}

export default App
