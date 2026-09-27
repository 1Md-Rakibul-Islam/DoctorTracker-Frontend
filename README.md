# Doctor Tracker Frontend

## Description
Doctor Tracker is a highly secure, modern administrative web application built with Next.js that empowers clinic administrators to seamlessly manage doctors and their corresponding patients. The platform provides a beautiful, responsive UI with a comprehensive dashboard for data visualization, and rigorous role-based access control, optimizing the overall workflow of medical facility management.

## Setup Guide

Follow these steps to get the frontend running locally.

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd doctor-tracker-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and use the `.env.example` as a reference.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## System Architecture

The frontend follows a modern React/Next.js architecture strictly separated from the backend API.
- **Client-Side Rendering (CSR) & Server-Side Rendering (SSR):** Next.js App Router handles dynamic page routing.
- **Data Flow:** The application uses native `fetch` combined with custom React hooks to communicate with the standalone Node.js/Express backend via RESTful endpoints. All API URLs are centralized in an `API_CONSTANT.ts` file for easy environment switching.
- **State & Auth Management:** NextAuth.js (Credentials Provider) manages the authentication state securely via JWTs stored in HttpOnly cookies, protecting the dashboard and management routes from unauthenticated access. 

## Technical Decisions

1. **Why we chose NextAuth.js over Custom JWT Handling**
   While we could have manually stored the backend's access tokens in `localStorage`, this exposes the application to Cross-Site Scripting (XSS) attacks. By utilizing NextAuth.js, we offload session management to Next.js server-side logic, securely storing tokens and handling callbacks in a standardized way without exposing raw tokens directly to the client bundle.

2. **Why we chose shadcn/ui & Tailwind CSS over Material UI**
   The project specification heavily emphasizes a modern, visually appealing UI with clean layouts. Material UI provides heavy, opinionated components that are hard to override. `shadcn/ui` combined with Tailwind CSS allows us to maintain a fully custom, headless component architecture that guarantees optimal bundle size, absolute styling freedom, and pristine UX without fighting the framework.

## Visual Evidence

*(Replace these placeholder links with actual screenshots of your application)*

- **Desktop Dashboard View:** `![Dashboard Desktop](./public/screenshots/dashboard-desktop.png)`
- **Mobile Responsive View:** `![Dashboard Mobile](./public/screenshots/dashboard-mobile.png)`
- **Doctor Management List:** `![Doctors List](./public/screenshots/doctors-list.png)`
