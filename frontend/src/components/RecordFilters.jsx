function RecordFilters({ filters, onChange, onReset }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Filters</h2>
        <button type="button" className="ghost-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="form-grid">
        <label>
          Type
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Category
          <input name="category" value={filters.category} onChange={handleChange} placeholder="e.g. Salary" />
        </label>
        <label>
          Start date
          <input name="start_date" type="date" value={filters.start_date} onChange={handleChange} />
        </label>
        <label>
          End date
          <input name="end_date" type="date" value={filters.end_date} onChange={handleChange} />
        </label>
      </div>
    </section>
  )
}

export default RecordFilters
