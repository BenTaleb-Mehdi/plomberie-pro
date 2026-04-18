# WORKFLOW: Phase 5 — Admin Panel
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Build the complete back-office admin interface: dashboard with KPIs,
full booking management, technician assignment, and reporting.

---

## STEP 5.1 — Admin Dashboard Page

### Pages/Admin/Dashboard.jsx
```jsx
import { Head } from '@inertiajs/react'
import { CalendarDays, Clock, CheckCircle, Users } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import { StatusBadge } from '@/Components/StatusBadge'
import { Link } from '@inertiajs/react'

export default function AdminDashboard({ stats, recentBookings, todayBookings }) {
    const statCards = [
        { label: 'Réservations aujourd\'hui', value: stats.bookings_today,   icon: CalendarDays, color: 'blue' },
        { label: 'En attente',                value: stats.bookings_pending,  icon: Clock,        color: 'amber' },
        { label: 'Ce mois',                   value: stats.bookings_month,    icon: CheckCircle,  color: 'green' },
        { label: 'Techniciens actifs',         value: stats.technicians,      icon: Users,        color: 'purple' },
    ]

    const colorMap = {
        blue:   'bg-blue-50 text-blue-700',
        amber:  'bg-amber-50 text-amber-700',
        green:  'bg-green-50 text-green-700',
        purple: 'bg-purple-50 text-purple-700',
    }

    return (
        <AdminLayout title="Tableau de bord">
            <Head title="Dashboard Admin" />

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-500 font-medium">{label}</span>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
                                <Icon size={18} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Réservations du jour */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">Aujourd'hui</h2>
                        <span className="text-sm text-slate-500">{todayBookings.length} intervention(s)</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {todayBookings.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-slate-400">
                                Aucune intervention prévue aujourd'hui.
                            </p>
                        ) : todayBookings.map(b => (
                            <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{b.client_name}</p>
                                    <p className="text-xs text-slate-500">{b.service_type?.name} — {b.booking_time}</p>
                                </div>
                                <StatusBadge status={b.status} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dernières réservations */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">Récentes</h2>
                        <Link href={route('admin.bookings.index')} className="text-sm text-blue-600 hover:underline">
                            Voir tout
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentBookings.map(b => (
                            <Link key={b.id} href={route('admin.bookings.show', b.id)}
                                className="block px-5 py-3 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{b.client_name}</p>
                                        <p className="text-xs text-slate-500">{b.confirmation_code} · {b.city}</p>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
```

---

## STEP 5.2 — Admin Bookings Index Page

### Pages/Admin/Bookings/Index.jsx

Key features:
- Filter bar: status dropdown, city dropdown, date input, search input
- Bookings table: see `skills/react-inertia.md → Admin Table Component`
- Pagination: see `Components/Pagination.jsx`
- Each row links to show page, has quick status badge

Filter implementation:
```jsx
import { router } from '@inertiajs/react'
import { useCallback, useState } from 'react'

function useFilters(initialFilters) {
    const [filters, setFilters] = useState(initialFilters)

    const applyFilter = useCallback((key, value) => {
        const updated = { ...filters, [key]: value || undefined }
        setFilters(updated)
        router.get(route('admin.bookings.index'), updated, {
            preserveState: true, preserveScroll: true, replace: true
        })
    }, [filters])

    return { filters, applyFilter }
}
```

---

## STEP 5.3 — Admin Booking Show Page

### Pages/Admin/Bookings/Show.jsx

Sections:
1. Booking details card (client info, service, date/time)
2. Status update panel: select new status + admin_notes textarea + submit
3. Technician assignment: select available technicians + assign button
4. Status timeline: map over `booking.status_logs`

```jsx
{/* Status timeline */}
<div className="space-y-3">
    {booking.status_logs.map((log, i) => (
        <div key={log.id} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={log.status} />
                    <span className="text-xs text-slate-400">
                        {new Date(log.created_at).toLocaleString('fr-MA')}
                    </span>
                </div>
                {log.note && <p className="text-xs text-slate-500 mt-1">{log.note}</p>}
                {log.changed_by && (
                    <p className="text-xs text-slate-400">par {log.changed_by.name}</p>
                )}
            </div>
        </div>
    ))}
</div>
```

---

## STEP 5.4 — Technician Management Pages

### Pages/Admin/Technicians/Index.jsx

- List of all technicians with: avatar initial, name, specialty, zone, availability toggle
- Add technician modal/slide-over: name, email, password, specialty, zone fields
- Availability toggle calls `PUT /admin/technicians/{id}` with `{ is_available: bool }`

---

## PHASE 5 CHECKLIST

- [ ] Admin Dashboard with 4 stat cards, today's jobs, recent bookings
- [ ] Bookings Index with filter bar and data table
- [ ] Booking Show with status update, technician assignment, timeline
- [ ] Technicians Index with availability toggle
- [ ] Services management page (CRUD for service types)
- [ ] Clients page (read-only list)
- [ ] Contacts page (unread messages)
- [ ] All admin pages use AdminLayout
- [ ] All admin routes protected by `role:admin` middleware
- [ ] Status updates send email notification to client

**✅ Phase 5 complete — proceed to Phase 6 (Deployment)**

---
---

# WORKFLOW: Phase 6 — Deployment
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Prepare the application for production deployment on a VPS or Laravel Forge.

---

## STEP 6.1 — Production .env

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://plomberiepro.ma

SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax

QUEUE_CONNECTION=redis
CACHE_STORE=redis

MAIL_MAILER=mailgun
MAILGUN_DOMAIN=plomberiepro.ma
MAILGUN_SECRET=key-xxxxxxxxxxxxx

LOG_CHANNEL=daily
LOG_LEVEL=error
```

---

## STEP 6.2 — Production Build Commands

```bash
# Optimiser Composer autoloader
composer install --optimize-autoloader --no-dev

# Compiler les assets
npm ci && npm run build

# Optimiser Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Lancer les migrations
php artisan migrate --force

# Démarrer le queue worker
php artisan queue:work redis --sleep=3 --tries=3 --daemon
```

---

## STEP 6.3 — Supervisor Config (queue worker)

```ini
[program:plomberie-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/plomberie-app/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/plomberie-app/storage/logs/worker.log
stopwaitsecs=3600
```

---

## STEP 6.4 — Nginx Config

```nginx
server {
    listen 443 ssl;
    server_name plomberiepro.ma www.plomberiepro.ma;

    root /var/www/plomberie-app/public;
    index index.php;

    ssl_certificate     /etc/ssl/certs/plomberiepro.ma.crt;
    ssl_certificate_key /etc/ssl/private/plomberiepro.ma.key;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* { deny all; }
}
```

---

## PHASE 6 CHECKLIST

- [ ] `.env.production` configured with real mail and domain
- [ ] `npm run build` generates assets in `public/build/`
- [ ] `php artisan optimize` runs without errors
- [ ] Queue worker running via Supervisor
- [ ] Nginx configured with SSL
- [ ] Storage symlink created: `php artisan storage:link`
- [ ] File permissions: `storage/` and `bootstrap/cache/` writable by www-data
- [ ] HTTPS redirect configured
- [ ] Cron job for Laravel scheduler: `* * * * * php artisan schedule:run`

**✅ Phase 6 complete — Project is live!**
