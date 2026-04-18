# WORKFLOW: Phase 6 — Deployment & Production
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Prepare the application for production deployment with all optimizations,
server configuration, and monitoring setup.

---

## STEP 6.1 — Environment Configuration

Create `.env.production`:

```env
APP_NAME="Plomberie Pro"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://plomberiepro.ma
APP_LOCALE=fr

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=plomberie_db
DB_USERNAME=plomberie_user
DB_PASSWORD=STRONG_PASSWORD_HERE

QUEUE_CONNECTION=redis
CACHE_STORE=redis
SESSION_DRIVER=redis
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=REDIS_PASSWORD_HERE

MAIL_MAILER=mailgun
MAILGUN_DOMAIN=plomberiepro.ma
MAILGUN_SECRET=key-xxxxxxxxxxxxx
MAIL_FROM_ADDRESS="noreply@plomberiepro.ma"
MAIL_FROM_NAME="Plomberie Pro"

LOG_CHANNEL=daily
LOG_LEVEL=error
```

---

## STEP 6.2 — Build & Optimize Commands

Run in order on the production server:

```bash
# 1. Installer les dépendances (sans dev packages)
composer install --optimize-autoloader --no-dev --no-interaction

# 2. Compiler les assets React + Tailwind
npm ci
npm run build

# 3. Générer la clé si première déploiement
php artisan key:generate --force

# 4. Lancer les migrations
php artisan migrate --force

# 5. Seeder en production (uniquement roles et services)
php artisan db:seed --class=RolesAndPermissionsSeeder --force
php artisan db:seed --class=ServiceTypeSeeder --force
php artisan db:seed --class=AdminUserSeeder --force

# 6. Optimisations Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 7. Lien storage
php artisan storage:link

# 8. Permissions fichiers
chown -R www-data:www-data storage/ bootstrap/cache/
chmod -R 775 storage/ bootstrap/cache/
```

---

## STEP 6.3 — Nginx Configuration

```nginx
# /etc/nginx/sites-available/plomberiepro.ma

server {
    listen 80;
    server_name plomberiepro.ma www.plomberiepro.ma;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name plomberiepro.ma www.plomberiepro.ma;

    root /var/www/plomberie-app/public;
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/plomberiepro.ma/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/plomberiepro.ma/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Static assets — long cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* { deny all; }

    access_log /var/log/nginx/plomberiepro-access.log;
    error_log  /var/log/nginx/plomberiepro-error.log;
}
```

---

## STEP 6.4 — Supervisor (Queue Worker)

```bash
# Installer Supervisor
apt install supervisor -y

# Créer le fichier de configuration
nano /etc/supervisor/conf.d/plomberie-worker.conf
```

```ini
[program:plomberie-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/plomberie-app/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600 --queue=default,notifications
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

```bash
# Démarrer Supervisor
supervisorctl reread
supervisorctl update
supervisorctl start plomberie-worker:*
supervisorctl status
```

---

## STEP 6.5 — Laravel Scheduler (Cron)

```bash
# Éditer crontab du www-data
crontab -u www-data -e

# Ajouter cette ligne
* * * * * cd /var/www/plomberie-app && php artisan schedule:run >> /dev/null 2>&1
```

---

## STEP 6.6 — SSL Certificate (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d plomberiepro.ma -d www.plomberiepro.ma
# Auto-renewal
certbot renew --dry-run
```

---

## STEP 6.7 — Deployment Script (Zero Downtime)

Save as `/var/www/deploy.sh`:

```bash
#!/bin/bash
set -e

echo ">>> Déploiement Plomberie Pro..."
cd /var/www/plomberie-app

echo ">>> Pull des modifications..."
git pull origin main

echo ">>> Installation Composer..."
composer install --optimize-autoloader --no-dev --no-interaction --quiet

echo ">>> Build assets..."
npm ci --silent && npm run build

echo ">>> Migrations..."
php artisan migrate --force --no-interaction

echo ">>> Optimisation Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo ">>> Redémarrage queue workers..."
php artisan queue:restart

echo ">>> Redémarrage PHP-FPM..."
service php8.2-fpm reload

echo "✅ Déploiement terminé avec succès!"
```

```bash
chmod +x /var/www/deploy.sh
```

---

## PHASE 6 CHECKLIST

- [ ] `.env` configured for production (no debug, strong passwords)
- [ ] `npm run build` generates optimized assets in `public/build/`
- [ ] All `php artisan *:cache` commands ran successfully
- [ ] MySQL database created with dedicated user (not root)
- [ ] Nginx config active and tested: `nginx -t`
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Supervisor running queue workers (check: `supervisorctl status`)
- [ ] Cron job configured for Laravel scheduler
- [ ] `storage/` and `bootstrap/cache/` writable by www-data
- [ ] Storage symlink created (`public/storage` → `storage/app/public`)
- [ ] HTTPS redirect working (HTTP → HTTPS)
- [ ] Login works: admin@plomberiepro.ma
- [ ] Booking form submits and sends confirmation email
- [ ] Queue processes emails (check: `php artisan queue:monitor`)

**✅ Phase 6 complete — Plomberie Pro est en ligne!**
