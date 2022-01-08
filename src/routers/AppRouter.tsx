import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../components/Dashboard'
import { LoginPage } from '../components/LoginPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)
