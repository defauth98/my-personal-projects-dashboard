import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateProject from './pages/CreateProject'
import LoginPage from './pages/LoginPage'
import ProjectList from './pages/ProjectList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/createProject" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  )
}
