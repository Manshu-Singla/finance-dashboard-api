import { useEffect, useState } from 'react'

const initialState = {
  amount: '',
  type: 'income',
  category: '',
  date: '',
  description: ''
}

function RecordForm({ onSubmit, editingRecord, onCancel }) {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        amount: editingRecord.amount,
        type: editingRecord.type,
        category: editingRecord.category,
        date: editingRecord.date,
        description: editingRecord.description || ''
      })
      return
    }

    setFormData(initialState)
  }, [editingRecord])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
    if (!editingRecord) {
      setFormData(initialState)
    }
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <h2>{editingRecord ? 'Edit record' : 'Add new record'}</h2>
        {editingRecord ? (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>

      <div className="form-grid">
        <label>
          Amount
          <input name="amount" type="number" min="0" step="0.01" value={formData.amount} onChange={handleChange} required />
        </label>
        <label>
          Type
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Category
          <input name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Date
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        </label>
      </div>

      <label>
        Description
        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} />
      </label>

      <button type="submit" className="primary-button">
        {editingRecord ? 'Update record' : 'Save record'}
      </button>
    </form>
  )
}

export default RecordForm
