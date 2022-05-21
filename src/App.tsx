import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
