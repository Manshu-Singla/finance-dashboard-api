function SummaryCards({ summary }) {
  const cards = [
    { label: 'Total Income', value: summary?.total_income ?? 0, tone: 'income' },
    { label: 'Total Expense', value: summary?.total_expense ?? 0, tone: 'expense' },
    { label: 'Balance', value: summary?.net_balance ?? 0, tone: 'balance' }
  ]

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card ${card.tone}`}>
          <p>{card.label}</p>
          <h3>${Number(card.value).toFixed(2)}</h3>
        </article>
      ))}
    </div>
  )
}

export default SummaryCards
