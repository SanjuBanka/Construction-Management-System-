# CONSTRUCT Edge — Construction Management System

A web-based construction management platform built with **React 18**, **Vite 5**, **Bootstrap 5**, and **React Router DOM v6**.

## Features

- **Dashboard** — Real-time metrics, project progress, team overview
- **Projects** — Track budget, timeline, and completion status
- **Employees** — Directory with skills, roles, and site assignments
- **Inventory** — Stock tracking with low-stock alerts and reorder levels
- **Customers** — Client accounts linked to projects
- **DB Schema** — ER diagram + normalization report (1NF → BCNF)
- **Settings** — Company configuration

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173`

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool & dev server |
| React Router DOM | 6.x | Client-side routing |
| Bootstrap | 5.x | CSS utilities |
| Tabler Icons | latest | Icon set |
| Barlow / Barlow Condensed | Google Fonts | Typography |

## Project Structure

```
construct-edge/
├── public/
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Employees.jsx
│   │   ├── Inventory.jsx
│   │   ├── Customers.jsx
│   │   ├── DBSchema.jsx
│   │   └── Settings.jsx
│   ├── App.jsx          # Layout + routing
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Database Schema

Based on the ER diagram with tables: Employee, Roles, Manager, Admin, Customers, Projects, Materials, Inventory.

Normalized to **BCNF** (Boyce–Codd Normal Form).
