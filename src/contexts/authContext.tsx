import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
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
}

type AuthContextData = {
  signed: boolean
  user: User | null
  loading: boolean
  handleLogin(email: string, password: string, save: boolean): Promise<void>
  retrieveDataFromLocalStorage: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigate()

  const retrieveDataFromLocalStorage = () => {
    const token = localStorage.getItem('@mppd_token')
    const user = localStorage.getItem('@mppd_user')

    if (token && user) {
      setUser(JSON.parse(user))

      api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      navigation('/')
    }
  }

  const moveToProjectPage = () => {
    navigation('/projects')
  }

  useEffect(() => {
    if (user) {
      moveToProjectPage()
    } else {
      retrieveDataFromLocalStorage()
    }
  }, [user])

  const handleLogin = async (
    email: string,
    password: string,
    save: boolean
  ) => {
    setLoading(true)

    const { status, data } = await api.post<LoginResponse>('/auth', {
      email,
      password,
    })

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

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        handleLogin,
        retrieveDataFromLocalStorage,
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
