# TaskPulse 🚀

A full-stack task management application built with Next.js, allowing users to create, manage, and track tasks with a clean Kanban board interface.

## Live Demo
[TaskPulse Live](https://taskpulse-mtys4phia-mohitburnwal2-8124s-projects.vercel.app/)

## Tech Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **ORM:** Prisma v6
- **Auth:** JWT (httpOnly cookies)
- **Deployment:** Vercel

## Features
- ✅ JWT Authentication (Register / Login / Logout)
- ✅ Protected routes via middleware
- ✅ Create, Edit, Delete tasks
- ✅ Kanban board (To Do / In Progress / Done)
- ✅ Filter tasks by status
- ✅ Due date support
- ✅ Responsive UI
- ✅ Clean component architecture

## Key Decisions
- **JWT in httpOnly cookies** — more secure than localStorage, prevents XSS attacks
- **Prisma ORM** — type-safe database queries, better DX
- **Next.js API Routes** — no separate Express server needed, simpler deployment
- **App Router** — better performance with server components
- **Component-based design** — TaskCard, TaskColumn, TaskModal, Navbar all separated

## Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation

1. Clone the repo
\```bash
git clone https://github.com/YOUR_USERNAME/taskpulse.git
cd taskpulse
\```

2. Install dependencies
\```bash
npm install
\```

3. Setup environment variables — create `.env` file:
\```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/taskpulse"
JWT_SECRET="your-secret-key"
\```

4. Generate Prisma client
\```bash
npx prisma generate
\```

5. Run development server
\```bash
npm run dev
\```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
\```
taskpulse/
  app/
    (auth)/         → Login & Register pages
    (dashboard)/    → Dashboard & Tasks pages
    api/            → API routes (auth + tasks)
  components/
    Navbar.tsx      → Navigation header
    TaskCard.tsx    → Individual task card
    TaskColumn.tsx  → Kanban column
    TaskModal.tsx   → Create/Edit task modal
  lib/
    db.ts           → Prisma client singleton
  types/
    index.ts        → Shared TypeScript types
  prisma/
    schema.prisma   → Database schema
\```

## Author
- **Name:** Mohit Burnwal
- **GitHub:** https://github.com/Mikey8250/
- **LinkedIn:** https://www.linkedin.com/in/mohit-burnwal-7608762b3/
