function RecordsTable({ records, canManage, onEdit, onDelete }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Financial records</h2>
        <span>{records.length} items</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>User</th>
              {canManage ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {records.length ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.category}</td>
                  <td className={record.type === 'income' ? 'text-income' : 'text-expense'}>{record.type}</td>
                  <td>${Number(record.amount).toFixed(2)}</td>
                  <td>{record.description || '-'}</td>
                  <td>{record.user?.username || '-'}</td>
                  {canManage ? (
                    <td className="actions-cell">
                      <button type="button" className="ghost-button" onClick={() => onEdit(record)}>
                        Edit
                      </button>
                      <button type="button" className="danger-button" onClick={() => onDelete(record.id)}>
                        Delete
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canManage ? 7 : 6} className="empty-state">
                  No records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecordsTable
