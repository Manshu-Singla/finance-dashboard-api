import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import RecordsPage from './pages/RecordsPage'
import { getStoredUser } from './utils/auth'

function App() {
  const user = getStoredUser()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/records"
        element={
          <ProtectedRoute>
            <Layout>
              <RecordsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
