# 🚀 Project Management & Collaboration Platform

A full-stack project management application built to streamline team collaboration, task tracking, and workflow management. This capstone project features secure user authentication, role-based access, and an interactive Kanban board for seamless productivity.

## ✨ Key Features

*   **Secure Authentication:** User sign-up and login utilizing JWT (JSON Web Tokens) for secure, stateless sessions.
*   **Role-Based Access Control:** Distinct permission levels for Admins, Members, and Guests.
*   **Workspace & Project Management:** Create, edit, and delete projects with dedicated workspaces.
*   **Interactive Kanban Board:** Visual task management with drag-and-drop functionality to move tasks across different statuses (e.g., To-Do, In Progress, Done).
*   **Task Details:** Assign priorities, set deadlines, and add descriptive labels to individual tasks.
*   **Real-Time Updates:** Dynamic UI updates without page refreshes for a seamless collaborative experience.
*   **File Sharing:** Upload, preview, and attach documents and images directly to tasks or projects.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Hooks & Context API)
*   React Router DOM (Routing)
*   Deployed on: Vercel

**Backend:**
*   Java Spring Boot
*   Spring Security (JWT Authentication)
*   Spring Data JPA (Hibernate)

**Database:**
*   MySQL (Hosted locally via XAMPP for development)

## 🚀 Local Development Setup

To run this project locally, you will need Node.js, Java JDK (17+), Maven, and XAMPP installed.

### 1. Database Setup
1. Start the **MySQL** service using the XAMPP Control Panel.
2. Open your MySQL client and create the database:
```sql
   CREATE DATABASE collab_db;
