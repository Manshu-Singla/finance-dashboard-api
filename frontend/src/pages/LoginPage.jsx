import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../api/client'
import { saveStoredUser } from '../utils/auth'

const loginState = { username: '', password: '' }
const registerState = { username: '', email: '', password: '', role: 'viewer' }

function LoginPage() {
  const [mode, setMode] = useState('login')
  const [loginForm, setLoginForm] = useState(loginState)
  const [registerForm, setRegisterForm] = useState(registerState)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('users/login/', loginForm)
      saveStoredUser(response.data)
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.non_field_errors?.[0] || 'Unable to log in.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.post('users/register/', registerForm)
      setMode('login')
      setLoginForm({ username: registerForm.username, password: registerForm.password })
    } catch (requestError) {
      const details = requestError.response?.data
      setError(details ? JSON.stringify(details) : 'Unable to register.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">University Assignment Ready</p>
        <h1>Finance Dashboard</h1>
        <p className="auth-copy">
          Register a demo user, then log in to explore viewer, analyst, and admin permissions.
        </p>

        <div className="tab-row">
          <button type="button" className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'register' ? 'tab active' : 'tab'} onClick={() => setMode('register')}>
            Register
          </button>
        </div>

        {error ? <div className="error-banner">{error}</div> : null}

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              Username
              <input
                value={loginForm.username}
                onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              Username
              <input
                value={registerForm.username}
                onChange={(event) => setRegisterForm((current) => ({ ...current, username: event.target.value }))}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>
            <label>
              Role
              <select
                value={registerForm.role}
                onChange={(event) => setRegisterForm((current) => ({ ...current, role: event.target.value }))}
              >
                <option value="viewer">Viewer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginPage
