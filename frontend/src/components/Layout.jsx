import { Link, useLocation, useNavigate } from 'react-router-dom'

import { clearStoredUser, getStoredUser } from '../utils/auth'

function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const user = getStoredUser()

  const handleLogout = () => {
    clearStoredUser()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Finance Dashboard</p>
          <h1>Track money with clarity.</h1>
          <p className="sidebar-copy">
            Built for a clean university demo with role-based access and live summaries.
          </p>
        </div>

        <nav className="nav-links">
          <Link className={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">
            Dashboard
          </Link>
          <Link className={location.pathname === '/records' ? 'active' : ''} to="/records">
            Records
          </Link>
        </nav>

        <div className="profile-card">
          <p>{user?.username}</p>
          <span>{user?.role}</span>
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  )
}

export default Layout
