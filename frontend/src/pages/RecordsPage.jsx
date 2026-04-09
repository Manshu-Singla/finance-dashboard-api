import { useEffect, useState } from 'react'

import api from '../api/client'
import RecordFilters from '../components/RecordFilters'
import RecordForm from '../components/RecordForm'
import RecordsTable from '../components/RecordsTable'
import SummaryCards from '../components/SummaryCards'
import { getStoredUser } from '../utils/auth'

const initialFilters = {
  type: '',
  category: '',
  start_date: '',
  end_date: ''
}

function RecordsPage() {
  const [records, setRecords] = useState([])
  const [summary, setSummary] = useState(null)
  const [editingRecord, setEditingRecord] = useState(null)
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(true)
  const user = getStoredUser()
  const canManage = user.role === 'admin'
  const canSeeSummary = user.role !== 'viewer'

  const buildQueryString = () => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })

    return params.toString()
  }

  const loadRecords = async () => {
    setLoading(true)
    const queryString = buildQueryString()

    try {
      const recordsResponse = await api.get(`records/${queryString ? `?${queryString}` : ''}`)
      setRecords(recordsResponse.data)

      if (canSeeSummary) {
        const summaryResponse = await api.get(`summary/${queryString ? `?${queryString}` : ''}`)
        setSummary(summaryResponse.data)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [filters.type, filters.category, filters.start_date, filters.end_date])

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const handleReset = () => {
    setFilters(initialFilters)
  }

  const handleSubmit = async (payload) => {
    const request = editingRecord
      ? api.put(`records/${editingRecord.id}/`, payload)
      : api.post('records/', payload)

    await request
    setEditingRecord(null)
    await loadRecords()
  }

  const handleDelete = async (recordId) => {
    await api.delete(`records/${recordId}/`)
    await loadRecords()
  }

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <h2>Records workspace</h2>
          <span>{loading ? 'Syncing data...' : 'Data loaded'}</span>
        </div>
        <p className="muted-copy">
          Viewer can inspect records, analyst can inspect plus summary, and admin can add, edit, and delete.
        </p>
      </section>

      {canSeeSummary ? <SummaryCards summary={summary} /> : null}

      <RecordFilters filters={filters} onChange={handleFilterChange} onReset={handleReset} />

      {canManage ? <RecordForm onSubmit={handleSubmit} editingRecord={editingRecord} onCancel={() => setEditingRecord(null)} /> : null}

      <RecordsTable records={records} canManage={canManage} onEdit={setEditingRecord} onDelete={handleDelete} />
    </div>
  )
}

export default RecordsPage
