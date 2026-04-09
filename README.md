# Finance Dashboard

Finance Dashboard is a full-stack assignment project built with Django REST Framework and React. It provides role-aware access to financial records, summary insights, and a simple login flow for demo users.

## Tech Stack

- Backend: Django, Django REST Framework
- Frontend: React, Vite, React Router, Axios
- Database: SQLite
- Authentication approach: demo login backed by Django users, with the active user passed to the API through the `X-User-Id` request header

## Features

- User registration and login
- Role-based access control for `viewer`, `analyst`, and `admin`
- Financial record CRUD operations
- Record filtering by type, category, start date, and end date
- Summary API with total income, total expense, net balance, and category totals
- Dashboard and records UI built in React
- Persistent storage with SQLite

## User Roles

- `viewer`: can log in and view records
- `analyst`: can view records and summary data
- `admin`: can view summary data and create, update, or delete records

## Project Structure

```text
finance project/
  backend/
    finance/
    finance_dashboard/
    users/
    manage.py
    db.sqlite3
  frontend/
    src/
    package.json
```

## Backend Overview

The backend is organized into two Django apps:

- `users`: manages user model, registration, login, and role-aware permission helpers
- `finance`: manages financial records, filtering, and summary aggregation

### Main API Endpoints

- `POST /api/users/register/`
- `POST /api/users/login/`
- `GET /api/users/me/`
- `GET /api/records/`
- `POST /api/records/`
- `PUT /api/records/:id/`
- `DELETE /api/records/:id/`
- `GET /api/summary/`

### Filtering

The records endpoint and summary endpoint support these query parameters:

- `type`
- `category`
- `start_date`
- `end_date`

Example:

```text
/api/records/?type=expense&category=food&start_date=2026-04-01&end_date=2026-04-30
```

## Frontend Overview

The frontend is a React single-page app with:

- login screen
- dashboard page with recent activity and summary cards
- records page with filters, table view, and admin-only record form

Routing is handled with React Router, and Axios is used for API requests.

## Setup Instructions

## Backend

1. Open a terminal in `backend`
2. Create and activate a virtual environment
3. Install Django and Django REST Framework
4. Run migrations
5. Start the server

Example commands:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework
python manage.py migrate
python manage.py runserver
```

## Frontend

1. Open a terminal in `frontend`
2. Install dependencies
3. Start the Vite dev server

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs on Vite and the API base URL is currently set to:

```text
http://127.0.0.1:8000/api/
```

## Technical Decisions and Trade-offs

- Django REST Framework was chosen because it provides fast API development, serializers, routing, and permission handling out of the box.
- React with Vite was used for a lightweight frontend that is quick to build and easy to extend.
- SQLite was selected for simplicity and easy local setup. This is a good fit for an assignment, but PostgreSQL would be a better choice for production.
- Role-based permissions are enforced on the backend so access rules are not dependent only on the frontend UI.
- The login/authentication flow is intentionally lightweight for assignment purposes. Instead of JWT or session-based authentication, the frontend sends `X-User-Id` with each request after login. This keeps the implementation simple, but it is not secure enough for production use.
- Summary data is computed on the server using database aggregation so the frontend stays simple and the API can return consistent totals.

## Known Limitations

- Authentication uses a custom header-based demo approach instead of JWT, OAuth, or secure session auth.
- There is no deployed production configuration yet.
- The database is SQLite and intended for local/demo use.
- Automated tests are minimal and can be expanded.
- There is no Swagger or Postman-hosted public API documentation yet.

## Suggested Improvements

- Replace header-based auth with JWT authentication
- Add pagination, search, and sorting for records
- Add better validation and user-facing error states
- Add charts for trends over time
- Move from SQLite to PostgreSQL for production readiness
- Add automated API and frontend tests
- Add Docker setup and deployment configuration

## Submission Notes

### Technical Decisions and Trade-offs

This project uses Django REST Framework for the backend and React with Vite for the frontend. Django REST Framework was chosen because it provides a clean structure for serializers, routing, and permission handling, which made it easier to build a role-based API quickly. SQLite was used as the database because it is simple to set up and works well for a local assignment project, although PostgreSQL would be a stronger production choice. For authentication, I used a lightweight demo approach where the frontend stores the logged-in user and sends the `X-User-Id` header with requests. This keeps the project easy to understand and test, but it is a deliberate trade-off because it is not as secure as JWT or session-based authentication. On the backend, permissions are enforced by role so that viewers, analysts, and admins each have different levels of access. Summary calculations are handled on the server using aggregation queries so the frontend can stay focused on presenting the data.

### Additional Notes

This submission includes user registration and login, role-based access control, financial record CRUD operations, filtering by type, category, and date range, and summary endpoints for totals and category breakdowns. The frontend includes a dashboard page, records management page, and role-aware UI behavior. The project is currently configured for local development with SQLite and a local API base URL. If needed, the next improvements would be secure authentication with JWT, expanded test coverage, production deployment, and public API documentation.
