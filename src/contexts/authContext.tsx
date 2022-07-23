import { useToast } from '@chakra-ui/react'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api/api'

type User = {
  id: string
  email: string
}

type LoginResponse = {
  token: string
  user: User
  message?: string
}

type AuthContextData = {
  signed: boolean
  user: User | null
  loading: boolean
  handleLogin(email: string, password: string, save: boolean): Promise<void>
  retrieveDataFromLocalStorage: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const navigation = useNavigate()

  useEffect(() => {
    if (user) {
      moveToProjectPage()
    } else {
      retrieveDataFromLocalStorage()
    }
  }, [user])

  function retrieveDataFromLocalStorage() {
    const token = localStorage.getItem('@mppd_token')
    const user = localStorage.getItem('@mppd_user')

    if (token && user) {
      setUser(JSON.parse(user))

      api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      navigation('/')
    }
  }

  function moveToProjectPage() {
    navigation('/projects')
  }

  async function handleLogin(email: string, password: string, save: boolean) {
    setLoading(true)

    const { status, data } = await api.post<LoginResponse>('/auth', {
      email,
      password,
    })

    if (data?.message) {
      toast({
        title: 'Não foi possível realizar o login',
        description: data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }

    if (String(status) === '200') {
      save && localStorage.setItem('@mppd_token', data.token)
      save && localStorage.setItem('@mppd_user', JSON.stringify(data.user))

      if (data.token) {
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`

        setUser(data.user)
      }
    }

    setLoading(false)
  }

  function logout() {
    setUser(null)

    localStorage.removeItem('@mppd_token')
    localStorage.removeItem('@mppd_user')
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        handleLogin,
        retrieveDataFromLocalStorage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
