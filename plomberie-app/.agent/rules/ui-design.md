# RULE FILE: UI Design Standards
# PlomberieDevAgent — Rules Layer

---

## 1. BRAND IDENTITY

**Company:** Plomberie Pro Maroc
**Theme:** Professional, trustworthy, clean — water/plumbing industry
**Primary color:** Blue (#2563EB) — trust, water, professionalism
**Accent color:** Sky (#0EA5E9) — water, freshness
**Market:** Moroccan — French primary, Arabic RTL secondary

---

## 2. COLOR SYSTEM

```
Primary:     blue-600   (#2563EB)  — buttons, links, active states
Primary dark:blue-700   (#1D4ED8)  — hover on primary
Accent:      sky-500    (#0EA5E9)  — highlights, badges, icons
Success:     green-500  (#22C55E)  — confirmed, completed
Warning:     amber-500  (#F59E0B)  — pending, attention
Danger:      red-500    (#EF4444)  — cancelled, error
Neutral:     slate-*               — text, backgrounds, borders
```

### Status badge colors (use consistently everywhere)
```jsx
const statusColors = {
    pending:     'bg-amber-100 text-amber-800 border-amber-200',
    confirmed:   'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-orange-100 text-orange-800 border-orange-200',
    completed:   'bg-green-100 text-green-800 border-green-200',
    cancelled:   'bg-red-100 text-red-800 border-red-200',
}
```

---

## 3. TYPOGRAPHY

```css
Font family: Inter (Google Fonts)
Fallback: system-ui, sans-serif

Sizes (Tailwind):
- Display:   text-4xl md:text-5xl lg:text-6xl font-bold
- H1:        text-3xl md:text-4xl font-bold
- H2:        text-2xl md:text-3xl font-semibold
- H3:        text-xl font-semibold
- Body:      text-base (16px)
- Small:     text-sm (14px)
- Caption:   text-xs (12px)

Colors:
- Headings:  text-slate-900
- Body:      text-slate-700
- Muted:     text-slate-500
- Disabled:  text-slate-400
```

---

## 4. SPACING SYSTEM

Follow Tailwind's 4px base unit (1 unit = 4px):
- Section padding: `py-16 md:py-24`
- Card padding: `p-6 md:p-8`
- Form field gap: `space-y-4` or `space-y-6`
- Grid gap: `gap-4 md:gap-6 lg:gap-8`
- Button padding: `px-6 py-3`

---

## 5. COMPONENT PATTERNS

### Primary Button
```jsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
    <Wrench size={18} />
    Réserver maintenant
</button>
```

### Secondary Button
```jsx
<button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-xl transition-colors duration-200">
    En savoir plus
</button>
```

### Danger Button
```jsx
<button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors duration-200">
    <X size={16} />
    Annuler
</button>
```

### Card
```jsx
<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
    {/* card content */}
</div>
```

### Input Field
```jsx
<div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">
        Nom complet <span className="text-red-500">*</span>
    </label>
    <input
        type="text"
        className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
        placeholder="Mohammed Alaoui"
    />
    {errors.client_name && (
        <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.client_name}
        </p>
    )}
</div>
```

### Status Badge
```jsx
export function StatusBadge({ status }) {
    const config = {
        pending:     { label: 'En attente',  classes: 'bg-amber-100 text-amber-800' },
        confirmed:   { label: 'Confirmé',    classes: 'bg-blue-100 text-blue-800' },
        in_progress: { label: 'En cours',    classes: 'bg-orange-100 text-orange-800' },
        completed:   { label: 'Terminé',     classes: 'bg-green-100 text-green-800' },
        cancelled:   { label: 'Annulé',      classes: 'bg-red-100 text-red-800' },
    }

    const { label, classes } = config[status] ?? config.pending

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
            {label}
        </span>
    )
}
```

---

## 6. PAGE LAYOUT PATTERNS

### Public page layout
```
┌─────────────────────────────────────┐
│  NAVBAR (sticky, white, shadow)     │
│  Logo | Nav links | CTA Button      │
├─────────────────────────────────────┤
│  PAGE CONTENT                       │
│  (max-w-7xl mx-auto px-4)          │
├─────────────────────────────────────┤
│  FOOTER (dark bg)                   │
│  Info | Links | Social | Copyright  │
└─────────────────────────────────────┘
```

### Admin page layout
```
┌──────────┬──────────────────────────┐
│          │  TOP BAR (user, notif)   │
│ SIDEBAR  ├──────────────────────────┤
│ (fixed)  │  PAGE HEADER             │
│ 240px    │  Title + breadcrumb      │
│          ├──────────────────────────┤
│ Nav      │  MAIN CONTENT            │
│ items    │  (p-6 or p-8)           │
│          │                          │
└──────────┴──────────────────────────┘
Mobile: sidebar hidden → hamburger menu
```

---

## 7. BOOKING WIZARD UI

The booking wizard is the most important UI element. Design rules:

### Step indicator
```jsx
// 3 steps: ① Choisir → ② Planifier → ③ Confirmer
<div className="flex items-center justify-center gap-0 mb-8">
    {steps.map((step, i) => (
        <div key={i} className="flex items-center">
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${i + 1 < currentStep ? 'bg-green-500 text-white' : ''}
                ${i + 1 === currentStep ? 'bg-blue-600 text-white' : ''}
                ${i + 1 > currentStep ? 'bg-slate-200 text-slate-400' : ''}
            `}>
                {i + 1 < currentStep ? <Check size={16} /> : i + 1}
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:block">
                {step.label}
            </span>
            {i < steps.length - 1 && (
                <div className={`
                    h-0.5 w-12 md:w-20 mx-3
                    ${i + 1 < currentStep ? 'bg-green-500' : 'bg-slate-200'}
                `} />
            )}
        </div>
    ))}
</div>
```

### Service selection card (Step 1)
```jsx
<button
    onClick={() => setData('service_type_id', service.id)}
    className={`
        w-full text-left p-5 rounded-xl border-2 transition-all duration-200
        ${data.service_type_id === service.id
            ? 'border-blue-600 bg-blue-50 shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
        }
    `}
>
    <div className="flex items-start gap-4">
        <div className={`
            p-3 rounded-xl
            ${data.service_type_id === service.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}
        `}>
            <ServiceIcon size={24} />
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{service.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{service.description}</p>
            <span className="inline-flex items-center gap-1 mt-2 text-xs text-slate-500">
                <Clock size={12} />
                {service.duration_minutes} min estimé
            </span>
        </div>
        {data.service_type_id === service.id && (
            <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
        )}
    </div>
</button>
```

### Time slot selector (Step 2)
```jsx
const slots = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00']

<div className="grid grid-cols-4 gap-2">
    {slots.map(slot => (
        <button
            key={slot}
            type="button"
            onClick={() => setData('booking_time', slot)}
            className={`
                py-2.5 rounded-lg text-sm font-medium transition-all
                ${data.booking_time === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'}
            `}
        >
            {slot}
        </button>
    ))}
</div>
```

---

## 8. RESPONSIVENESS RULES

All pages must work perfectly on:
- Mobile: 375px+ (iPhone SE and up)
- Tablet: 768px+
- Desktop: 1024px+
- Wide: 1280px+

Rules:
- Sidebar in admin: visible on `lg:` and up, hidden on mobile (slide-in menu)
- Service cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Time slots: `grid-cols-2 sm:grid-cols-4`
- Admin table: horizontal scroll on mobile (`overflow-x-auto`)
- Navbar: hamburger on mobile, full nav on `md:` and up

---

## 9. LOADING & ERROR STATES

Always show loading state when Inertia is processing:

```jsx
import { useForm } from '@inertiajs/react'

const { processing } = useForm({ ... })

<button disabled={processing} className="...">
    {processing ? (
        <>
            <Loader2 size={18} className="animate-spin" />
            Traitement...
        </>
    ) : (
        <>
            <CheckCircle size={18} />
            Confirmer la réservation
        </>
    )}
</button>
```

### Flash message display (in layout)
```jsx
import { usePage } from '@inertiajs/react'

const { flash } = usePage().props

{flash.success && (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 text-green-800 rounded-xl shadow-lg">
        <CheckCircle size={18} className="text-green-600" />
        {flash.success}
    </div>
)}

{flash.error && (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 text-red-800 rounded-xl shadow-lg">
        <AlertCircle size={18} className="text-red-600" />
        {flash.error}
    </div>
)}
```

---

## 10. ICONS REFERENCE (Lucide)

Standard icon assignments for this project:

```
Wrench          → general plumbing, tools
Droplets        → water, débouchage
Thermometer     → chauffe-eau, temperature
Zap             → installation électrique/sanitaire
Search          → détection de fuite
Phone           → contact, appel
Mail            → email
MapPin          → adresse, localisation
Calendar        → date, réservation
Clock           → heure, durée
CheckCircle     → confirmé, succès
XCircle         → annulé, erreur
AlertCircle     → attention, warning
Users           → clients, technicians list
User            → profil, client individuel
Settings        → paramètres admin
BarChart3       → statistiques, rapports
Loader2         → loading spinner (animate-spin)
ChevronRight    → navigation, étape suivante
ChevronLeft     → retour
Menu            → hamburger mobile
X               → fermer, annuler
Copy            → copier le code
Check           → validé, coché
Eye             → voir détail
Edit            → modifier
Trash2          → supprimer
Plus            → ajouter
Shield          → sécurité, admin
```
