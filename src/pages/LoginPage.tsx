import { Button, Checkbox, Container, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useAuth } from '../contexts/authContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSession, setKeepSession] = useState(false)

  const { user, handleLogin, retrieveDataFromLocalStorage, loading } = useAuth()

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
        onChange={(event: any) => setEmail(event.target.value)}
        type="email"
        autoComplete="on"
      />
      <Input
        marginBottom="0.6rem"
        placeholder="*********"
        type="password"
        onChange={(event: any) => setPassword(event.target.value)}
      />
      <Checkbox
        checked={keepSession}
        onChange={() => setKeepSession(!keepSession)}
        margin="1rem 0"
      >
        Continuar logado
      </Checkbox>

      <Button
        width="100%"
        colorScheme="cyan"
        onClick={() => handleLogin(email, password, keepSession)}
        isLoading={loading}
      >
        Login
      </Button>
    </Container>
  )
}

export default LoginPage
