const STORAGE_KEY = 'finance-dashboard-user'

export function getStoredUser() {
  const rawUser = localStorage.getItem(STORAGE_KEY)
  return rawUser ? JSON.parse(rawUser) : null
}

export function saveStoredUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEY)
}
