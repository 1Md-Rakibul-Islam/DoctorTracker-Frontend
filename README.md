# Doctor Tracker Frontend

A modern, responsive administrative portal for the Doctor Tracker application. Built with Next.js (App Router), Tailwind CSS, and shadcn/ui to provide a seamless user experience for managing doctors and patients.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui & Radix UI
- **Authentication:** NextAuth.js (Credentials Provider)
- **Forms & Validation:** React Hook Form & Zod
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Context (via providers) & Zustand

## Features

- **Secure Authentication:** Complete login and registration flows protected by NextAuth JWT strategies, integrated with a custom backend.
- **Role-based Dashboards:** Overview of medical practice statistics and metrics.
- **Doctor Management:** View, search, filter, create, and manage registered doctors. Includes dynamic tracking of assigned patients.
- **Patient Management:** View, search, filter, edit, and manage patients. Easily assign or reassign patients to specific doctors.
- **Centralized API Architecture:** All backend API URLs and routes are rigorously centralized into a single `API_CONSTANT.ts` file.
- **Fully Responsive:** Mobile-first approach guaranteeing great UI across desktop and mobile devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- The `doctor-tracker-backend` must be running locally or deployed.

## Installation

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <your-repository-url>
   cd doctor-tracker-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory of the frontend project and add the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_key_at_least_32_chars
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Backend API Configuration
# Point this to your backend server (local or deployed). DO NOT use trailing slashes!
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

> **Important:** If your backend is deployed (e.g. on Vercel), set `NEXT_PUBLIC_API_BASE_URL` to `https://your-backend.vercel.app/api/v1`. Keep `NEXTAUTH_URL` pointing to the URL of the _frontend application_ (e.g. `http://localhost:3000` for development).

## Running the App

### Development Mode

To run the Next.js server with Turbopack for fast refresh:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To build and run the optimized production application:

```bash
npm run build
npm start
```

## Project Structure

The project heavily utilizes Feature-Sliced Design principles, grouping logic by business features rather than strictly by file type.

```
src/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── (auth)/           # Authentication pages (Login, Register)
│   ├── (dashboard)/      # Protected dashboard pages
│   └── api/auth/         # NextAuth.js endpoints
├── components/           # Global reusable UI components (shadcn/ui, layout)
├── constants/            # Centralized constants (API_CONSTANT.ts)
├── features/             # Feature-based logic (Doctors, Patients, Auth, Dashboard)
│   ├── auth/             # Hooks, schemas, types for authentication
│   ├── doctors/          # API fetchers, schemas, types, specialized components
│   └── patients/         # API fetchers, schemas, types, specialized components
├── lib/                  # Utility functions (utils.ts)
├── providers/            # React context providers (AppWrapper, SessionProvider)
└── types/                # Global TypeScript interfaces
```

---

_Built with ❤️ for Doctor Tracker._
