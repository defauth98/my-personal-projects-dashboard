import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import ApiStatus from './pages/ApiStatus'
import CreateProject from './pages/CreateProject'
import EditProject from './pages/EditProject'
import LoginPage from './pages/LoginPage'
import ProjectList from './pages/ProjectList'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/editProject/:projectId" element={<EditProject />} />
          <Route path="/apisStatus" element={<ApiStatus />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
