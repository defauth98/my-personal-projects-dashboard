import { Button, Container, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useAuth } from '../contexts/authContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, handleLogin, retrieveDataFromLocalStorage } = useAuth()

  useEffect(() => {
    if (user === null) {
      retrieveDataFromLocalStorage()
    }
  }, [user])

  return (
    <Container
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Input
        marginBottom="0.6rem"
        placeholder="email@mail.com"
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        autoComplete="on"
      />
      <Input
        marginBottom="0.6rem"
        placeholder="*********"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        width="100%"
        colorScheme="cyan"
        onClick={() => handleLogin(email, password, true)}
      >
        Login
      </Button>
    </Container>
  )
}

export default LoginPage
