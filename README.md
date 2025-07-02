# 🗒️ NoteStack

**NoteStack** is a secure, full-stack notes application built to help users manage, upload, and organize notes effectively with authentication and media support.

---

## Tech Stack

- **Next.js**
- **Supabase**
  - Auth (JWT-based)
  - Database
  - Storage Buckets (File Uploads)
- **React Query** – Data fetching & caching
- **Zod** – Form validation
- **Tailwind CSS** – Responsive and beautiful UI
- **Lucide Icons** – Elegant icon set

---

## Features

- **User Authentication** (Sign up, login, logout)
-  **Notes CRUD**
  - Create, edit, delete, and view notes
  - Attach **images or files** to notes via Supabase buckets
-  **Form Validation** using Zod
-  **File Uploads**
  - Media/files stored in folders named after user IDs
  - Image previews and file links
- **Dashboard Sidebar Navigation**
  - Consistent sidebar across all dashboard routes
  - Links to: Dashboard, Upload, My Content
-  **React Query Integration**
  - Efficient data fetching
  - Real-time updates after creating/editing/deleting notes
-  **Responsive and polished UI**
- **Editable fields**: title, content, degree, semester, file
-  **Media file editing** during note updates

---

