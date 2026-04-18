# 🔧 Plomberie Pro — Tanger Plomberie

> **SaaS-Ready Management Platform & Professional Showcase** for plumbing services. Built with a high-fidelity "Hard Edges" design system, optimized for performance and conversion.

![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)

---

## 📋 Table of Contents

- [🌟 Project Vision](#-project-vision)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Architecture](#-project-architecture)
- [💻 Development Workflow](#-development-workflow)
- [📄 License](#-license)

---

## 🌟 Project Vision

**Plomberie Pro** is more than just a website; it's a comprehensive management ecosystem for plumbing professionals. It combines a **premium landing page** for customer acquisition with a **robust admin dashboard** and **client portal** for operations management.

The platform is designed with a "Hard Edges" aesthetic — prioritizing clarity, high data density, and cinematic visuals.

---

## ✨ Key Features

### 🏢 Infrastructure
- **Role-Based Access (RBAC)**: Fine-grained permissions (Admin, Technician, Client) via Spatie.
- **Inertia.js Integration**: Seamless SPA experience using Laravel backend with React frontend.
- **Responsive Design**: Mobile-first "Hard Edges" UI optimized for field technicians and desktop admins.

### 🛠️ Core Modules
- **Service Management**: Dynamic service catalog with real-time image previews and slug-based routing.
- **Booking System**: Comprehensive appointment scheduling with status tracking and logs.
- **Intervention Tracking**: Digital records for on-site plumbing interventions.
- **Portfolio (Projects)**: High-fidelity gallery to showcase completed work and build trust.
- **Client Portal**: Dedicated space for clients to track their history and requests.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12.0
- **Language**: PHP 8.2+
- **Database**: MySQL / SQLite (Development)
- **Auth**: Laravel Breeze + Sanctum
- **Packages**: `spatie/laravel-permission`, `tightenco/ziggy`

### Frontend
- **Library**: React 18
- **Styling**: Tailwind CSS 4.0 (Vite integration)
- **Animations**: Framer Motion & React Spring
- **Icons**: Lucide React
- **State Management**: Inertia.js (Server-driven state)

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+ & npm
- A local database (MySQL or SQLite)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/BenTaleb-Mehdi/plomberie-pro.git
cd plomberie-pro/plomberie-app

# 2. Install dependencies
composer install
npm install

# 3. Environment Setup
cp .env.example .env
php artisan key:generate

# 4. Database Setup
# If using SQLite:
touch database/database.sqlite
php artisan migrate --seed

# 5. Build Assets & Start
npm run dev
# In another terminal:
php artisan serve
```

---

## 📁 Project Architecture

```bash
plomberie-pro/
├── plomberie-app/          # Core Laravel Application
│   ├── app/                # PHP Logic (Models, Controllers, Services)
│   ├── database/           # Migrations, Seeders & Factories
│   ├── resources/
│   │   ├── js/             # React Components & Pages
│   │   └── css/            # Global Styles (Tailwind 4)
│   ├── routes/             # Web & API Routes
│   ├── tests/              # Feature & Unit Tests
│   └── vite.config.js      # Build configuration
└── README.md
```

---

## 💻 Development Workflow

### Useful Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Launch Vite dev server |
| `php artisan serve` | Start Laravel local server |
| `php artisan migrate:refresh --seed` | Reset and re-seed database |
| `php artisan test` | Run PHPUnit test suite |
| `npm run build` | Compile assets for production |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Crafted with precision by <b>BenTaleb Mehdi</b></sub>
</div>