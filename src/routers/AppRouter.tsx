import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
)
