# Doctor Tracker Frontend

Doctor Tracker is a modern administrative web application built with **Next.js** that helps clinic administrators efficiently manage doctors and their corresponding patients.

The application provides a responsive dashboard, role-based access control, secure authentication, and an intuitive interface for managing medical facility workflows.

## ✨ Features

- 🔐 Secure authentication with NextAuth.js
- 👥 Role-based access control
- 👨‍⚕️ Doctor management
- 🧑‍🤝‍🧑 Patient management
- 📊 Administrative dashboard
- 📱 Responsive and modern UI
- ⚡ Next.js App Router
- 🎨 Tailwind CSS and shadcn/ui
- 🔄 RESTful API integration with the backend
- 🍪 Secure session management using HttpOnly cookies

---

## 🚀 Live Application

### Frontend

https://doctor-tracker-frontend-plum.vercel.app/

### Backend API

https://doctor-tracker-backend-sandy.vercel.app/

---

## 💻 Local Development

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/1Md-Rakibul-Islam/DoctorTracker-Frontend.git

cd DoctorTracker-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and use `.env.example` as a reference.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

> Do not commit your `.env` file to the repository. Keep sensitive credentials and secrets in environment variables.

### 4. Run the Development Server

```bash
npm run dev
```

The frontend will be available at:

http://localhost:3000

---

## 🔗 Backend Configuration

### Local Backend

```text
http://localhost:5000
```

### Production Backend

```text
https://doctor-tracker-backend-sandy.vercel.app
```

Make sure the frontend API configuration points to the correct backend depending on the environment.

---

## 🏗️ System Architecture

The frontend follows a modern **Next.js App Router** architecture and communicates with a standalone Node.js/Express backend through RESTful APIs.

### Client & Server Rendering

The application uses Next.js App Router and supports both:

- Client-Side Rendering (CSR)
- Server-Side Rendering (SSR)

This allows pages and components to use the rendering strategy that best fits their requirements.

### Data Flow

The frontend communicates with the backend through RESTful API endpoints.

The general data flow is:

```text
User
  ↓
Next.js Frontend
  ↓
Custom Hooks / API Layer
  ↓
REST API
  ↓
Node.js + Express Backend
  ↓
MongoDB
```

API endpoints and configuration are centralized to make switching between development and production environments easier.

### Authentication & Authorization

Authentication is handled using **NextAuth.js with the Credentials Provider**.

The authentication flow integrates with the backend API and uses secure server-side session management. Authentication-related tokens are handled through protected cookies rather than exposing raw tokens directly to the client.

Protected dashboard and management routes are accessible only to authenticated and authorized users.

---

## 🛠️ Technology Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **NextAuth.js**

### Backend

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**

### Deployment

- **Vercel**

---

## 🧠 Technical Decisions

### 1. Why NextAuth.js Instead of Custom JWT Handling?

A custom implementation could store backend access tokens directly in `localStorage`, but this increases the potential impact of Cross-Site Scripting (XSS) vulnerabilities.

Using NextAuth.js provides a standardized authentication and session-management layer within the Next.js application. It allows authentication logic to be handled through server-side mechanisms and secure cookies rather than exposing raw authentication tokens unnecessarily to client-side JavaScript.

This approach also makes protected routes and session handling easier to maintain.

---

### 2. Why shadcn/ui and Tailwind CSS Instead of Material UI?

The project focuses on providing a modern, clean, and highly customizable administrative interface.

While Material UI provides a large collection of ready-made components, its opinionated styling system can require additional customization when building a fully custom design.

**shadcn/ui** and **Tailwind CSS** provide:

- Highly customizable components
- Utility-first styling
- Better control over the visual design
- Reusable component patterns
- Lightweight and maintainable UI architecture
- Consistent design across the application

This combination makes it easier to build a modern dashboard without being tightly coupled to a predefined component design system.

---

## 📁 Project Structure

A simplified project structure:

```text
doctor-tracker-frontend/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── ...
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── README.md
```

> The exact structure may vary as the project evolves.

---

## 🌐 Environment Configuration

The application can use different API endpoints for development and production.

### Development

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Production

```env
NEXT_PUBLIC_API_URL=https://doctor-tracker-backend-sandy.vercel.app/api/v1
```

For Vercel deployments, configure environment variables through the Vercel project settings rather than committing sensitive values to the repository.

---

## 📦 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run Linter

```bash
npm run lint
```

---

## 🔒 Security Considerations

- Sensitive environment variables should never be committed to Git.
- Authentication should be handled through secure session mechanisms.
- Production credentials should be configured through Vercel Environment Variables.
- API access should be protected using authentication and authorization.
- Backend validation should be applied to all user-controlled input.
- CORS should be configured to allow only trusted frontend origins in production.

---

## 📌 Project Status

The project is deployed on Vercel and uses a separate Node.js/Express backend API.

**Frontend:**
https://doctor-tracker-frontend-plum.vercel.app/

**Backend:**
https://doctor-tracker-backend-sandy.vercel.app/

---

## 👨‍💻 Author

**Rakibul Islam**

GitHub:
https://github.com/1Md-Rakibul-Islam
