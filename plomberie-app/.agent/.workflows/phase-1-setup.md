# WORKFLOW: Phase 1 — Project Setup
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Initialize the complete Laravel 12 + React + Inertia + Breeze project
from scratch with all dependencies configured and ready for development.

---

## STEP 1.1 — Create Laravel Project

```bash
composer create-project laravel/laravel plomberie-app "12.*"
cd plomberie-app
```

**Verify:** `php --version` must show >= 8.2

---

## STEP 1.2 — Install All Dependencies

```bash
# Packages Composer backend
composer require laravel/breeze --dev
composer require spatie/laravel-permission
composer require tightenco/ziggy

# Scaffold Breeze avec Inertia + React (TypeScript optionnel)
php artisan breeze:install react --no-interaction

# Packages npm frontend
npm install lucide-react
npm install @vitejs/plugin-react
npm install @tailwindcss/vite

# Publier le fichier de configuration Spatie
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

---

## STEP 1.3 — Configure .env

Create/edit `.env` with these values:

```env
APP_NAME="Plomberie Pro"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_LOCALE=fr
APP_FALLBACK_LOCALE=ar
APP_FAKER_LOCALE=fr_MA

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=plomberie_db
DB_USERNAME=root
DB_PASSWORD=Mehdyboss2004

QUEUE_CONNECTION=redis
CACHE_STORE=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_FROM_ADDRESS="noreply@plomberiepro.ma"
MAIL_FROM_NAME="Plomberie Pro"
```

---

## STEP 1.4 — Configure vite.config.js

Replace the entire `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
})
```

---

## STEP 1.5 — Configure resources/css/app.css

Replace with:

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@theme {
    --font-sans: 'Inter', system-ui, sans-serif;
    --color-primary: #2563EB;
    --color-primary-dark: #1D4ED8;
    --color-accent: #0EA5E9;
}
```

---

## STEP 1.6 — Create Database & Run Initial Migration

```bash
# Créer la base de données MySQL
mysql -u root -e "CREATE DATABASE IF NOT EXISTS plomberie_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Générer la clé application
php artisan key:generate

# Lancer les migrations initiales (Breeze + Spatie)
php artisan migrate

# Vérifier que les tables sont créées
php artisan db:show
```

---

## STEP 1.7 — Configure AppServiceProvider

```php
// app/Providers/AppServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Règle de mot de passe par défaut
        Password::defaults(function () {
            return Password::min(8);
        });
    }
}
```

---

## STEP 1.8 — Test Installation

```bash
# Lancer le serveur de développement
php artisan serve &
npm run dev &

# Vérifier que la page d'accueil s'affiche
curl -I http://localhost:8000
# Doit retourner: HTTP/1.1 200 OK
```

---

## STEP 1.9 — Create Directory Structure

```bash
# Créer les dossiers controllers
mkdir -p app/Http/Controllers/{Public,Admin,Client,Technician}
mkdir -p app/Http/Requests
mkdir -p app/Services
mkdir -p app/Enums
mkdir -p app/Policies
mkdir -p app/Mail
mkdir -p app/Jobs

# Créer les dossiers React
mkdir -p resources/js/{Pages/{Public,Admin,Client,Technician},Components/{Booking,Admin,Technician},Layouts,hooks}

# Créer les dossiers vues email
mkdir -p resources/views/emails/booking
```

---

## PHASE 1 CHECKLIST

Before proceeding to Phase 2, verify ALL items:

- [ ] `composer.json` contains laravel/breeze, spatie/laravel-permission, tightenco/ziggy
- [ ] `package.json` contains lucide-react, @vitejs/plugin-react, @tailwindcss/vite
- [ ] `.env` configured with correct DB and mail settings
- [ ] `php artisan migrate` ran without errors
- [ ] `php artisan serve` starts without errors
- [ ] `npm run dev` starts without errors
- [ ] Browser shows Laravel/Breeze welcome page at http://localhost:8000
- [ ] `/register` and `/login` pages work correctly
- [ ] All directory structures created

**✅ Phase 1 complete — proceed to Phase 2 (Database)**
