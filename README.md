# StudentHub — Student Database Management System

A full-stack student management application developed for the **EWB Edu Tech Pvt. Ltd. Python Backend Development Internship Assignment**.

StudentHub provides a web interface for creating, viewing, searching, updating, and deleting student records. The intended architecture uses a React frontend, a Python FastAPI backend, and an SQLite database for persistent storage. An optional Ollama-powered assistant can answer natural-language questions about the database.

> **Implementation note:** This README describes the intended setup. Confirm that the generated project contains the listed files and endpoints, and adjust commands or endpoint names to match the actual code before submission. Do not claim that a feature works until it has been tested.

## Features

### Required functionality
- Create student records.
- List and search student records.
- View an individual student's details.
- Update a student's details.
- Delete a student after confirmation.
- Validate required fields and contact information.
- Store records persistently in SQLite.
- Handle invalid input and missing records with appropriate errors.
- Provide interactive API documentation through FastAPI's Swagger UI.

### Interface
- Responsive dashboard and student table.
- Student creation and editing forms.
- Search, filters, and pagination where implemented.
- Loading, empty, success, and error states.
- Dashboard statistics based on backend data, where implemented.

### Optional extension
- Local AI assistant using Ollama.
- Natural-language questions grounded in records retrieved by the backend.
- The core CRUD application should remain usable when AI is disabled.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| API communication | Axios |
| Backend | Python, FastAPI, Uvicorn |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Database | SQLite |
| Optional AI | Ollama |
| Testing | Pytest, FastAPI TestClient |

## Project Structure

The exact structure may differ depending on how the project was generated. A recommended layout is:

```text
studenthub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routers/
│   │   └── services/
│   ├── tests/
│   ├── scripts/
│   └── requirements.txt
├── .gitignore
└── README.md
```

## Requirements

Install the following tools:

- Python 3.11 or newer
- Node.js and npm (a current LTS release is recommended)
- Git, if you plan to publish the project to GitHub

The optional AI feature also requires [Ollama](https://ollama.com/).

## Setup and Run

Open two terminal windows: one for the backend and one for the frontend.

### 1. Start the Python backend

Open a terminal in the project directory, then navigate to the backend folder:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can use Command Prompt instead:

```bat
.venv\Scripts\activate.bat
```

Install backend dependencies:

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Configure environment variables using the project's `.env.example`, if the application uses a `.env` file. Copy it to `.env` and adjust values as needed. Never commit `.env`.

Start the server using the module path that matches the actual project.

For a backend where `main.py` is inside `backend/app/`:

```powershell
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

For a backend where the application module is `backend/main.py` and you run the command from the repository root:

```powershell
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Use only the command matching your files. Keep the backend terminal open.

Once running, open:

- API documentation: http://127.0.0.1:8000/docs
- OpenAPI schema: http://127.0.0.1:8000/openapi.json
- Health check: http://127.0.0.1:8000/health

### 2. Initialize the database

If the application creates its SQLite tables automatically on startup, no separate initialization command may be necessary.

If a seed script is included, run it from the directory specified by the project. For example:

```powershell
python scripts/seed_data.py
```

Use fictional sample data only. Confirm the actual script path before running the command.

The SQLite database file is commonly named `students.db`. Its exact location depends on the configured database URL.

### 3. Start the frontend

Open a second terminal at the frontend directory:

```powershell
cd frontend
npm install
```

Create the frontend environment file if the project supports it. For a local backend, the setting may be:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Then start the development server:

```powershell
npm run dev
```

Open the local URL printed by Vite in the terminal, commonly http://localhost:5173.

Keep both the frontend and backend running during development.

> **Remote preview note:** If the frontend is hosted in an online builder or remote preview, `127.0.0.1` may refer to that preview environment rather than your computer. Configure a backend URL reachable from the preview, use HTTPS when required, and configure FastAPI CORS for the exact frontend origin. Never expose a development server publicly without considering security.

## Student Data Fields

A student record may include:

| Field | Description |
|---|---|
| `id` | Unique ID generated by the backend |
| `name` | Student's name (required) |
| `date_of_birth` | Date of birth in `YYYY-MM-DD` format (required) |
| `email` | Email address, if supplied |
| `phone` | Contact number, if supplied |
| `course` | Course name (optional) |
| `address` | Address (optional) |
| `enrollment_date` | Enrollment date (optional) |

The application should require at least one contact method—email or phone—and reject invalid values. Email uniqueness should be enforced if that is how the backend is implemented.

Use fictional student data for demonstrations and tests.

## API Reference

The following routes are recommended for the assignment. Confirm them in `/docs`, because the actual implementation may use different paths or response formats.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/students` | Create a student |
| `GET` | `/students` | List and filter students |
| `GET` | `/students/{student_id}` | Retrieve one student |
| `PUT` | `/students/{student_id}` | Replace editable student details |
| `PATCH` | `/students/{student_id}` | Update selected fields |
| `DELETE` | `/students/{student_id}` | Delete a student |
| `GET` | `/health` | Application health, if implemented |
| `GET` | `/health/database` | Database connectivity, if implemented |
| `GET` | `/dashboard/stats` | Dashboard metrics, if implemented |
| `POST` | `/ai/ask` | Optional AI question endpoint |

### Example: Create a student

Send a `POST` request to `/students` with a JSON body such as:

```json
{
  "name": "Aarav Sharma",
  "date_of_birth": "2005-04-12",
  "email": "aarav.example@example.com",
  "phone": "9000000001",
  "course": "Computer Science",
  "address": "Hyderabad",
  "enrollment_date": "2026-08-01"
}
```

The example uses fictional information. Your API may require a slightly different request schema; check `/docs`.

### Example: List students

```http
GET /students
```

If implemented, filtering and pagination may be available through query parameters, for example:

```http
GET /students?search=Aarav&skip=0&limit=10
```

### Example: Retrieve a student

```http
GET /students/1
```

Replace `1` with an ID returned by your API.

### Example: Update a student

Send a `PATCH` request to `/students/1`:

```json
{
  "course": "Artificial Intelligence"
}
```

A partial update should modify only the supplied fields if the backend implements PATCH semantics.

### Example: Delete a student

```http
DELETE /students/1
```

The API may return `204 No Content` after successful deletion. Verify the actual response in Swagger UI.

## Testing the API

1. Start the FastAPI server.
2. Open http://127.0.0.1:8000/docs.
3. Expand `POST /students`, choose **Try it out**, and create a fictional student.
4. Use `GET /students` to verify that the student appears.
5. Open the student's detail endpoint using the returned ID.
6. Test `PUT` and `PATCH` to update the record.
7. Test `DELETE` and then verify the record is no longer returned.
8. Test an unknown ID and invalid input to verify error handling.
9. Restart the backend and retrieve the record again to check SQLite persistence.

## Automated Tests

If tests are included in `backend/tests/`, activate the backend virtual environment and run:

```powershell
python -m pytest
```

Tests should use a separate temporary database rather than changing the development database.

Do not report that the tests pass until the command has been run and its result checked.

## Optional Ollama AI Assistant

The AI extension is optional and must not be required for CRUD functionality.

1. Install Ollama from https://ollama.com/.
2. Start Ollama according to its installation instructions.
3. Download the configured model. For example:

   ```powershell
   ollama pull llama3.2:1b
   ```

4. Configure the model name and Ollama base URL in the backend environment settings, if supported.
5. Enable the AI feature using the configuration expected by the project.
6. Start or restart the backend.
7. Test the AI endpoint or the AI Assistant page.

Example question:

```json
{
  "question": "How many students are there?"
}
```

The backend should retrieve or calculate the relevant information from SQLite and provide grounded context to the model. Do not allow the model to execute unrestricted SQL. If Ollama is unavailable, the application should show an informative message while keeping CRUD operations available.

## Troubleshooting

### The frontend cannot connect to FastAPI
- Confirm the backend terminal shows that Uvicorn is running.
- Open `/docs` directly in your browser.
- Check `VITE_API_BASE_URL`.
- Restart the frontend after changing environment variables.
- Verify CORS configuration and the frontend's exact origin.
- For remote previews, use a backend URL reachable from the preview.

### The app displays an empty student list
- Confirm the database was initialized.
- Create a test student through Swagger UI.
- Check the backend logs for database errors.
- Verify the application is using the expected SQLite database file.

### Changes disappear after restarting
- Check the SQLite database URL and file location.
- Confirm that the application is not using in-memory SQLite.
- Confirm all CRUD operations write through SQLAlchemy to the persistent database.

### The AI assistant is unavailable
- Verify that Ollama is installed and running.
- Confirm the configured model has been downloaded.
- Check the model name and backend environment settings.
- Review backend logs without sharing secrets publicly.

### Dependencies fail to install
- Confirm the correct Python and Node.js versions are installed.
- Activate the intended virtual environment.
- Run the installation commands from the correct directory.
- Review the error output and dependency versions in the project files.

## GitHub Submission

Before publishing:

1. Verify all required source files are present.
2. Run the backend and frontend locally.
3. Test all CRUD operations and persistence.
4. Run the available automated tests.
5. Remove real student information and credentials.
6. Confirm `.gitignore` excludes `.env`, virtual environments, caches, and local database files.
7. Include `requirements.txt`, frontend package files, and this README.
8. Commit and push the project to your GitHub repository.

Example commands, run from the repository root:

```powershell
git init
git add .
git status
git commit -m "Build StudentHub student CRUD application"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your own repository URL. If the repository is already initialized or has a remote, do not repeat those setup commands blindly.

## Project Objective

StudentHub is intended to demonstrate backend development fundamentals through a practical application: REST API design, database persistence, input validation, error handling, frontend integration, and testing.

**Before submission, verify the implementation against the EWB Edu Tech assignment requirements and update this README to match the code that actually exists and has been tested.**
