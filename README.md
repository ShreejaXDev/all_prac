# CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY
## Faculty of Technology and Engineering (FTE)
### Department of Information Technology

**Subject**: Advanced Web Development Frameworks (ITUE301) | **Semester**: 5th  
**Student Name**: Shreeja Patel  
**Repository**: `portfolio-ShreejaXDev` / `all_prac`

---

## 🚀 Unified Full-Stack Student Portfolio & Task Management Application (Practicals 1–7)

This project brings together all 7 Practicals into a single, cohesive full-stack web application. It features a modern **Vite + React 18** Single Page Application frontend and a **Node.js + Express** RESTful backend connected to **MongoDB Atlas** with **JWT Authentication** and **Mongoose Schema Validation**.

---

## 🛠️ Practicals Overview & Feature Matrix

| Practical | Subject / Feature Focus | Components & Implementation Highlights |
| :--- | :--- | :--- |
| **Practical 1** | Introduction to React & Component Architecture | Reusable `Header.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `Footer.jsx`. Props passed for student name & skill array rendering via `.map()`. |
| **Practical 2** | State Management & Routing in React | `react-router-dom` v6 setup with `<BrowserRouter>`. Nav bar with `<Link>` navigation, active link styling, `ContactPage.jsx` controlled form with live character counter, UI visibility toggle, 404 `NotFoundPage.jsx`, and dark/light theme toggle. |
| **Practical 3** | API Integration & Async Data Rendering | `useEffect` fetching GitHub REST API repos in `ProjectsPage.jsx`. State management for `loading` (`<Spinner />`), `error` (`<ErrorMessage />` with retry), stargazer counts, and search filter input. |
| **Practical 4** | RESTful API with Node.js & Express | Express backend in `server/` with complete CRUD routes (`GET`, `POST`, `PUT`, `DELETE` `/api/tasks`). Request logging middleware (`logger.js`), `validateContentType.js` validator, and global 500 error handler. |
| **Practical 5** | MongoDB Integration & Mongoose Schema Design | Connected to **MongoDB Atlas** using Mongoose. `Task.js` schema with required fields (`title`), default values (`completed: false`, `createdAt`), priority enum (`low`, `medium`, `high`), and pre-save trim hook. Structured JSON validation error handling. |
| **Practical 6** | Full Stack Integration (React + Express + MongoDB) | Frontend `api.js` client consuming Express REST API with `cors` enabled. Real-time task creation, status toggling, task editing, deletion with confirmation modal (`ConfirmModal.jsx`), and toast notifications (`Toast.jsx`). |
| **Practical 7** | Authentication & Middleware Pipeline | `User.js` schema with `bcryptjs` password hashing and `jsonwebtoken` token issuance (1h expiry). `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`. Protected task routes via `auth.js` Bearer JWT verification middleware. `AuthModal.jsx` in frontend. |

---

## 📂 Project Architecture

```
all_prac/
├── .gitignore
├── .env.example
├── README.md
├── package.json               # Root scripts runner
├── client/                    # Vite + React 18 Frontend
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── main.jsx           # Entry point wrapped with BrowserRouter
│   │   ├── App.jsx            # Main Router layout, Theme toggle, Auth state
│   │   ├── index.css          # Glassmorphism design system & HSL themes
│   │   ├── components/
│   │   │   ├── Header.jsx     # Header banner accepting name prop
│   │   │   ├── About.jsx      # Bio section
│   │   │   ├── Skills.jsx     # Dynamic skillList list mapping
│   │   │   ├── Projects.jsx   # Featured projects card grid
│   │   │   ├── Footer.jsx     # Copyright & institution details
│   │   │   ├── NavBar.jsx     # React Router links & active route indicator
│   │   │   ├── TaskManager.jsx# Full-stack task CRUD interface
│   │   │   ├── Spinner.jsx    # Loading state indicator
│   │   │   ├── ErrorMessage.jsx# Error card with retry button
│   │   │   ├── Toast.jsx      # Real-time toast feedback popups
│   │   │   ├── ConfirmModal.jsx# Delete confirmation modal dialog
│   │   │   └── AuthModal.jsx  # Login & Register modal dialog
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Main landing page
│   │   │   ├── ProjectsPage.jsx# REST API GitHub repository browser
│   │   │   ├── ContactPage.jsx# Controlled form with live character count
│   │   │   └── NotFoundPage.jsx# 404 Route handling
│   │   └── services/
│   │       └── api.js         # Centralized API service with Bearer auth headers
└── server/                    # Node.js + Express + Mongoose Backend
    ├── package.json
    ├── .env
    ├── .env.example
    ├── server.js              # Express server pipeline & middleware setup
    ├── config/
    │   └── db.js              # Mongoose MongoDB Atlas connection handler
    ├── models/
    │   ├── Task.js            # Mongoose Task Schema & validation rules
    │   └── User.js            # Mongoose User Schema for authentication
    ├── middleware/
    │   ├── logger.js          # Request logger (method, url, timestamp)
    │   ├── validateContentType.js # JSON Content-Type header validator
    │   ├── auth.js            # JWT Bearer token authentication middleware
    │   └── errorHandler.js    # Global error handler & 404 middleware
    └── routes/
        ├── taskRoutes.js      # CRUD routes (/api/tasks)
        └── authRoutes.js      # Auth routes (/api/auth)
```

---

## ⚡ Quick Start & Execution Instructions

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file inside `server/` with:
```env
PORT=5000
MONGO_URI=mongodb+srv://admin:Portfolio123!@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_itue301_2026
```

### 3. Run the Development Application
Open two terminal windows:

**Terminal 1 (Express REST Backend)**:
```bash
cd server
npm start
```
*Server runs on `http://localhost:5000`*

**Terminal 2 (Vite React Frontend)**:
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🗄️ MongoDB Atlas Setup Guide (Step-by-Step)

1. **Sign Up**: Register a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. **Create Cluster**: Select **M0 Free Tier**, choose AWS/GCP region, and click **Create Deployment**.
3. **Add Database User**: Go to **Database Access** -> Click **Add New Database User** -> Set Username: `admin`, Password: `Portfolio123!` -> Set Role: **Read and write to any database** -> Click **Add User**.
4. **Whitelist Network Access**: Go to **Network Access** -> Click **Add IP Address** -> Select **Allow Access from Anywhere** (`0.0.0.0/0`) -> Click **Confirm**.
5. **Copy Connection String**: Go to **Database** -> Click **Connect** -> Choose **Drivers (Node.js)** -> Copy `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority`.
6. Paste the string into `server/.env` as `MONGO_URI`.

---

## 📜 Complete Git Commit History Guideline

```bash
# Practical 1 Commit
git add .
git commit -m "feat(practical-1): complete React setup and reusable component architecture"

# Practical 2 Commit
git add .
git commit -m "feat(practical-2): implement React Router v6 navigation and useState hooks"

# Practical 3 Commit
git add .
git commit -m "feat(practical-3): add REST API integration with loading and error states"

# Practical 4 Commit
git add .
git commit -m "feat(practical-4): build Express RESTful API with CRUD routes and middleware pipeline"

# Practical 5 Commit
git add .
git commit -m "feat(practical-5): integrate MongoDB Atlas with Mongoose schema validation"

# Practical 6 Commit
git add .
git commit -m "feat(practical-6): integrate React frontend with Express MongoDB backend for full-stack CRUD"

# Practical 7 Commit
git add .
git commit -m "feat(practical-7): implement JWT authentication, password hashing, and route protection middleware"
```
