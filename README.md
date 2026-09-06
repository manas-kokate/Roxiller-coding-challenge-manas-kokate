# Vantage — Store Rating Platform

A full-featured, role-based web app for rating and discovering local stores, built as a solution to the Roxiler Systems full-stack coding challenge. This repository contains the **frontend** — a React + Vite single-page application with three distinct dashboards (Admin, Normal User, and Store Owner), a polished landing page, and a complete authentication flow.

> Built by **Manas Kokate** as a coding challenge submission.

---

## What this project is

The brief for this challenge is a classic one: build a platform where an **admin** manages users and stores, **normal users** browse stores and submit a 1–5 star rating, and **store owners** see how their store is being rated. The interesting part is almost always in the details — field-level validation, role-based access, filtering/searching large tables, and keeping the UI clean across three very different user experiences.

Rather than a bare-bones implementation, this repo leans into product polish: a real landing page, animated transitions, a cohesive dark/light theme, toast notifications, loading states, and empty states — the kind of details that separate a "technically correct" submission from one that feels shippable.

---

## Key features

### 🔐 Authentication & onboarding
- Single login screen with a role switcher (User / Admin / Store Owner)
- Self-service **sign-up** for Normal Users and Store Owners (Admins are provisioned separately, as per the spec)
- Client-side validation that mirrors the challenge's exact rules:
  - **Name:** 20–60 characters
  - **Address:** up to 400 characters
  - **Password:** 8–16 characters, must include at least one uppercase letter and one special character
  - **Email:** standard email format validation
- "Change password" flow available to logged-in users of every role
- Session persistence via `localStorage`, with automatic redirect on token expiry (401/403 handling)

### 🛠️ Admin dashboard
- Overview stats: total users, total stores, total ratings submitted
- **User management:** searchable, filterable table (by name, email, address, role) with the ability to add new users (Admin / Normal User / Store Owner)
- **Store management:** searchable, paginated store directory with the ability to register new stores and optionally assign an owner
- Built to comfortably handle large datasets without the UI falling over

### ⭐ Normal user dashboard
- Browse all registered stores with name, address, and overall average rating
- Search stores by name or address
- Submit or modify a personal rating (1–5) for any store, with instant UI feedback
- Clean visual distinction between a store's overall rating and the user's own rating

### 🏪 Store owner dashboard
- See every rating and comment submitted for their store
- Average rating summary and a star-distribution breakdown (how many 5-star, 4-star, etc.)
- List of raters with name, email, and submission date

### 🎨 Landing page & UX polish
- Animated marketing homepage with a light/dark theme toggle
- Consistent design system across every screen (custom color palette, typography, iconography via `lucide-react`)
- Toast notifications and a global loading overlay for async actions
- Fully responsive layout with a collapsible mobile sidebar

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 8](https://vitejs.dev/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Maps | [Leaflet](https://leafletjs.com/) |
| Linting | ESLint 10 (flat config) |

This is a **client-only** repository. It's designed to talk to a REST API (see [Backend / API contract](#backend--api-contract) below) — it does not include a server.

---

## Project structure

```
src/
├── api.js                     # Fetch wrapper + typed API helpers (auth, admin, user, owner)
├── App.jsx                    # Route definitions & session-based route guarding
├── main.jsx                   # App entry point
├── pages/
│   ├── Home.jsx                # Marketing / landing page
│   ├── Login.jsx                # Login route wrapper
│   └── DashboardLayout.jsx     # Role-aware shell: fetches data, renders the right dashboard
└── components/
    ├── Login.jsx                # Login + sign-up UI, client-side validation
    ├── ChangePassword.jsx       # Password reset / change flow
    ├── Sidebar.jsx               # Role-based navigation
    ├── Profile.jsx                # User profile view
    ├── Feedback.jsx               # Toast + loading overlay components
    ├── Admin/
    │   ├── AdminDashboard.jsx     # Stats overview
    │   ├── Users.jsx                # User management table
    │   └── Stores.jsx               # Store management table
    ├── Owner/
    │   └── OwnerDashboard.jsx      # Ratings received for the owner's store
    └── User/
        └── UserDashboard.jsx       # Store directory + rating submission
```

---

## Getting started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/<your-username>/Roxiller-coding-challenge-manas-kokate.git
cd Roxiller-coding-challenge-manas-kokate
npm install
```

### Configure the API URL

The app expects a backend running at `http://localhost:3000/api` by default. To point it somewhere else, create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:3000/api
```

### Run it

```bash
npm run dev       # start the dev server (default: http://localhost:5173)
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

---

## Backend / API contract

This frontend is built against a REST API with the following endpoints (implement these on your backend to run the app end-to-end):

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/auth/login` | Log in, returns user + token |
| `POST` | `/auth/signup` | Register a Normal User or Store Owner |
| `POST` | `/auth/send-otp` | Send a password-reset OTP |
| `POST` | `/auth/reset-password` | Reset password using OTP |
| `POST` | `/auth/logout` | Invalidate the current session |
| `GET` | `/admin/dashboard` | Aggregate stats (users, stores, ratings) |
| `GET` | `/admin/users` | List all users |
| `POST` | `/admin/users` | Create a new user |
| `GET` | `/admin/stores` | List all stores |
| `POST` | `/admin/stores` | Create a new store |
| `GET` | `/user/stores` | List stores + this user's rating, if any |
| `POST` | `/user/stores/:storeId/ratings` | Submit or update a rating |
| `GET` | `/owner/dashboard` | Ratings/comments for the owner's store |

All authenticated requests are sent with a `Bearer` token in the `Authorization` header (`src/api.js` handles this automatically once a user is logged in).

---

## Design notes & decisions

- **Role is enforced client-side for UX, server-side for security.** The frontend routes users to the right dashboard based on their role, but the actual authorization boundary must live in the API — this repo assumes the backend re-validates every request.
- **Optimistic-friendly, not optimistic.** Actions like adding a user/store or submitting a rating show a loading overlay and re-fetch fresh data on success, rather than guessing at the new state — this keeps the UI honest about what the server actually persisted.
- **Validation lives close to the form.** Sign-up rules (name/address/password length, password complexity) are enforced in `Login.jsx` before any network call, so users get instant feedback instead of a round-trip error.

---

## License

This project was created as a coding challenge submission. Feel free to explore the code as a reference, but please don't submit it as your own work for the same or a similar assessment.
