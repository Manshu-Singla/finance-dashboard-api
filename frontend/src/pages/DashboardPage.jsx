import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../api/client'
import SummaryCards from '../components/SummaryCards'
import { getStoredUser } from '../utils/auth'

function DashboardPage() {
  const [summary, setSummary] = useState(null)
  const [recentRecords, setRecentRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const user = getStoredUser()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const recordsResponse = await api.get('records/')
        setRecentRecords(recordsResponse.data.slice(0, 5))

        if (user.role !== 'viewer') {
          const summaryResponse = await api.get('summary/')
          setSummary(summaryResponse.data)
        }
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [user.role])

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>{user.username}</h2>
          <p className="muted-copy">
            Your current role is <strong>{user.role}</strong>. Viewer can browse data, analyst can see summaries, and admin can manage everything.
          </p>
        </div>
        <Link className="primary-button link-button" to="/records">
          Open records
        </Link>
      </section>

      {user.role !== 'viewer' ? <SummaryCards summary={summary} /> : null}

      <section className="panel">
        <div className="panel-heading">
          <h2>Recent activity</h2>
          {loading ? <span>Loading...</span> : <span>{recentRecords.length} latest records</span>}
        </div>
        <div className="recent-list">
          {recentRecords.map((record) => (
            <article key={record.id} className="recent-item">
              <div>
                <p>{record.category}</p>
                <span>{record.date}</span>
              </div>
              <strong className={record.type === 'income' ? 'text-income' : 'text-expense'}>
                {record.type === 'income' ? '+' : '-'}${Number(record.amount).toFixed(2)}
              </strong>
            </article>
          ))}
          {!recentRecords.length && !loading ? <p className="muted-copy">No records yet. Add one from the records page.</p> : null}
        </div>
      </section>

      {user.role !== 'viewer' && summary?.category_totals?.length ? (
        <section className="panel">
          <div className="panel-heading">
            <h2>Category summary</h2>
            <span>Grouped by type</span>
          </div>
          <div className="category-grid">
            {summary.category_totals.map((item, index) => (
              <article key={`${item.category}-${item.type}-${index}`} className="category-card">
                <p>{item.category}</p>
                <span>{item.type}</span>
                <strong>${Number(item.total).toFixed(2)}</strong>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default DashboardPage
