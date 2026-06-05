# Doctor Hub

Enterprise AI-powered healthcare ecosystem for patients, doctors, assistants, admins, and super admins.

## Apps

- `backend`: Node.js, Express, TypeScript, MongoDB, Socket.io, JWT/RBAC.
- `frontend`: React, Vite, TypeScript, Tailwind, role dashboards, AI healthcare UI.
- `docs`: architecture, ERD, launch checklist, API notes.

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev:backend
npm run dev:frontend
```

Backend defaults to `http://localhost:5000`. Frontend defaults to `http://localhost:5173`.

## Production Notes

This scaffold follows clean architecture boundaries and includes the core production concerns up front: RBAC, audit logging, validation, immutable medical records/prescriptions, realtime events, AI service adapters, and deployment config placeholders. Fill real Supabase, MongoDB Atlas, Cloudinary, TURN, and AI provider keys before production deployment.

## Theme System & Visual Design

DoctorHub AI features a premium UI design system with:
- **Global Theme Selector**: Switch between 12 distinct custom themes (including `light`, `dark`, `midnight`, `emerald`, `azure`, `onyx`, `pulse`, `nova`, `sterile`, `cobalt`, and a `custom` theme with a color picker).
- **Persistent State**: The chosen theme is persisted globally using Zustand middleware and applied immediately across all roles and pages.
- **Modern Glassmorphism & Animations**: Leveraging Framer Motion and custom CSS variables for smooth gradients, hover-based glows, and subtle entrance animations.
- **3D Landing Page**: Interactive 3D medical items (cross, pill, DNA knot) built using vanilla Three.js that react smoothly to mouse cursor movement.
