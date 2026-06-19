# Collaboration Platform - Capstone Project

A beginner-friendly team collaboration app with **React** frontend and **Spring Boot** backend.

## Features

| Feature | Description |
|---------|-------------|
| **JWT Auth** | Sign up / Login with token-based authentication |
| **Roles** | Admin, Member, Guest (role-based access) |
| **Projects** | Create, view, edit, delete projects |
| **Kanban Board** | Drag-and-drop tasks (To Do → In Progress → Done) |
| **Tasks** | Priority, deadlines, labels |
| **Real-time** | Auto-refresh tasks every 5 seconds (useEffect polling) |
| **File Sharing** | Upload and preview images/documents |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Hooks (useState, useEffect), React Router, Bootstrap CSS |
| State | Context API + Prop Drilling |
| API Calls | fetch() to REST API |
| Backend | Java Spring Boot 3 |
| Database | MySQL (XAMPP) |
| Auth | JWT secret key (unchanged for safety) |

---

## Quick Start (One Command)

1. Start **XAMPP MySQL** (keep it running)
2. Open terminal in project root: `C:\Javascript\Rect\collaboration-platform`
3. Run:

```bash
npm install
npm start
```

This starts **both** backend (port 8080) and frontend (port 3000) automatically.

**MySQL login (unchanged):** username `root`, password **empty** (blank)

---

## Project Structure

```
collaboration-platform/
├── client/                    # React Frontend
│   ├── public/
│   └── src/
│       ├── components/        # Reusable UI (Navbar, KanbanBoard, etc.)
│       ├── pages/             # Login, Register, Dashboard, ProjectDetail
│       ├── context/           # AuthContext (global user state)
│       ├── services/          # API calls using fetch()
│       ├── App.js
│       └── index.js
├── src/main/java/             # Spring Boot Backend
│   └── com/collaboration/platform/
│       ├── controller/        # REST API endpoints
│       ├── service/           # Business logic
│       ├── model/             # Database entities
│       ├── repository/        # JPA repositories
│       ├── security/          # JWT + Spring Security
│       └── config/            # Data seeder
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

---

## Step-by-Step Setup (VS Code)

### Prerequisites

Install these before starting:

1. **Node.js** (v18+) → https://nodejs.org
2. **Java JDK 17** → https://adoptium.net
3. **VS Code** with extensions:
   - Extension Pack for Java
   - ES7+ React/Redux/React-Native snippets

---

### Step 1: Open Project in VS Code

```
File → Open Folder → C:\Javascript\Rect\collaboration-platform
```

---

### Step 2: Run Everything (Recommended)

```bash
npm install
npm start
```

✅ Backend: **http://localhost:8080**  
✅ Frontend: **http://localhost:3000**

---

### Step 2 (Alternative): Start Backend Only

Open a terminal in VS Code (`Ctrl + ~`) and run:

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
```

✅ Backend runs at: **http://localhost:8080**

**Demo users** (auto-created on first run):

| Email | Password | Role |
|-------|----------|------|
| admin@collab.com | admin123 | ADMIN |
| member@collab.com | member123 | MEMBER |
| guest@collab.com | guest123 | GUEST (read-only) |

**H2 Database Console:** http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/collabdb`
- Username: `sa`
- Password: *(leave empty)*

---

### Step 3: Start the Frontend (React)

Open a **second terminal** and run:

```bash
cd client
npm install
npm start
```

✅ Frontend runs at: **http://localhost:3000**

---

### Step 4: Use the App

1. Open http://localhost:3000
2. Login with `member@collab.com` / `member123`
3. Create a project
4. Open the project → Add tasks
5. Drag tasks between columns on the Kanban board
6. Upload files in the Files section

---

## REST API Endpoints

### Authentication
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Sign up |
| POST | `/api/auth/login` | Login (returns JWT token) |

### Projects
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

### Tasks
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/projects/{id}/tasks` | Get tasks |
| POST | `/api/projects/{id}/tasks` | Create task |
| PUT | `/api/projects/{id}/tasks/{taskId}` | Update task |
| PATCH | `/api/projects/{id}/tasks/{taskId}/status` | Move task (Kanban) |
| DELETE | `/api/projects/{id}/tasks/{taskId}` | Delete task |

### Files
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/files/project/{projectId}` | List files |
| POST | `/api/files/upload/{projectId}` | Upload file |
| GET | `/api/files/download/{fileId}` | Download file |
| DELETE | `/api/files/{fileId}` | Delete file |

---

## Role Permissions

| Action | Admin | Member | Guest |
|--------|-------|--------|-------|
| View projects/tasks | ✅ | ✅ | ✅ |
| Create/Edit projects | ✅ | ✅ | ❌ |
| Create/Edit tasks | ✅ | ✅ | ❌ |
| Drag Kanban tasks | ✅ | ✅ | ❌ |
| Upload files | ✅ | ✅ | ❌ |
| Delete projects | ✅ | ❌ | ❌ |
| Delete tasks/files | ✅ | ✅ | ❌ |

---

## Switch to MySQL (Optional)

1. Install MySQL and create database `collab_db`
2. Edit `src/main/resources/application.properties`:
   - Comment out H2 lines
   - Uncomment MySQL lines
   - Set your MySQL username/password
3. Restart the backend

---

## Key React Concepts Used

### useState
```javascript
const [tasks, setTasks] = useState([]);
```

### useEffect
```javascript
// Load data on page mount
useEffect(() => { loadProjects(); }, []);

// Real-time polling every 5 seconds
useEffect(() => {
  const interval = setInterval(refreshTasks, 5000);
  return () => clearInterval(interval);
}, [id]);
```

### fetch() API calls
```javascript
const response = await fetch('http://localhost:8080/api/projects', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Prop Drilling
Tasks flow: `ProjectDetail` → `KanbanBoard` → `TaskColumn` → `TaskCard`

### Context API
`AuthContext` shares logged-in user across all components.

---

## Deployment (Later)

| Part | Platform |
|------|----------|
| Frontend | Vercel or Netlify |
| Backend | Render or Railway |
| Database | MySQL on Railway/PlanetScale |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8080 in use | Stop other Java apps or change `server.port` in application.properties |
| CORS error | Make sure backend is running on port 8080 |
| npm install fails | Run `cd client` first, then `npm install` |
| Login fails | Check backend is running; use demo accounts above |

---

## Created With

```bash
# React app was created with:
npx create-react-app collaboration-platform

# Spring Boot was generated from:
https://start.spring.io
```

---

**Happy Coding! 🚀**
