import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../components/Dashboard'
import { LoginPage } from '../components/LoginPage'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)
