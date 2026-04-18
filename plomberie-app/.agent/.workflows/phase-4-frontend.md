# WORKFLOW: Phase 4 — Frontend Pages & Components
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Build all React pages, layouts, and shared components using Inertia.js,
Tailwind CSS, Lucide icons, and ReactBit components.

---

## STEP 4.1 — Create Layouts

### PublicLayout.jsx
```jsx
// resources/js/Layouts/PublicLayout.jsx
import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X, Phone, Mail, MapPin, Droplets } from 'lucide-react'
import { FlashMessage } from '@/Components/FlashMessage'

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { auth } = usePage().props

    const navLinks = [
        { label: 'Accueil',   href: route('home') },
        { label: 'Services',  href: route('services') },
        { label: 'À propos',  href: route('about') },
        { label: 'Contact',   href: route('contact') },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <FlashMessage />

            {/* Navbar */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link href={route('home')} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Droplets size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-slate-900 text-lg">Plomberie Pro</span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href}
                                    className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + auth */}
                        <div className="hidden md:flex items-center gap-3">
                            {auth.user ? (
                                <Link href={auth.user.roles.includes('admin')
                                    ? route('admin.dashboard')
                                    : route('client.dashboard')}
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600">
                                    Mon espace
                                </Link>
                            ) : (
                                <Link href={route('login')}
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600">
                                    Connexion
                                </Link>
                            )}
                            <Link href={route('booking.create')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                Réserver
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-slate-600 hover:text-slate-900">
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href}
                                className="block py-2 text-slate-700 font-medium hover:text-blue-600"
                                onClick={() => setMobileOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <Link href={route('booking.create')}
                            className="block mt-3 text-center py-3 bg-blue-600 text-white font-medium rounded-lg"
                            onClick={() => setMobileOpen(false)}>
                            Réserver maintenant
                        </Link>
                    </div>
                )}
            </header>

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Droplets size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-white text-lg">Plomberie Pro</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Services de plomberie professionnels dans la région Tanger-Tétouan-Al Hoceïma.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            {['Fuite d\'eau','Débouchage','Installation sanitaire','Chauffe-eau','Robinetterie'].map(s => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-2"><Phone size={14} /> +212 6XX XXX XXX</li>
                            <li className="flex items-center gap-2"><Mail size={14} /> contact@plomberiepro.ma</li>
                            <li className="flex items-center gap-2"><MapPin size={14} /> Tanger, Maroc</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} Plomberie Pro Maroc — Tous droits réservés
                </div>
            </footer>
        </div>
    )
}
```

### AdminLayout.jsx
```jsx
// resources/js/Layouts/AdminLayout.jsx
import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
    LayoutDashboard, CalendarDays, Users, Wrench,
    BarChart3, MessageSquare, Settings, LogOut,
    Menu, X, Bell, ChevronDown, Droplets
} from 'lucide-react'
import { FlashMessage } from '@/Components/FlashMessage'

const navItems = [
    { label: 'Tableau de bord', href: 'admin.dashboard',   icon: LayoutDashboard },
    { label: 'Réservations',    href: 'admin.bookings.index', icon: CalendarDays },
    { label: 'Techniciens',     href: 'admin.technicians.index', icon: Wrench },
    { label: 'Clients',         href: 'admin.clients.index',  icon: Users },
    { label: 'Services',        href: 'admin.services.index', icon: Settings },
    { label: 'Rapports',        href: 'admin.reports.index',  icon: BarChart3 },
    { label: 'Messages',        href: 'admin.contacts.index', icon: MessageSquare },
]

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { auth } = usePage().props

    const logout = () => router.post(route('logout'))

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <FlashMessage />

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 flex flex-col transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex
            `}>
                {/* Logo */}
                <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Droplets size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-white">Plomberie Pro</span>
                    <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive = route().current(href)
                        return (
                            <Link key={href} href={route(href)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}>
                                <Icon size={18} />
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-slate-800">
                    <button onClick={logout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4">
                    <button onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-slate-600 hover:text-slate-900">
                        <Menu size={22} />
                    </button>

                    {title && (
                        <h1 className="text-lg font-semibold text-slate-900 hidden sm:block">{title}</h1>
                    )}

                    <div className="ml-auto flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:text-slate-700 relative">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                                {auth.user?.name?.[0]?.toUpperCase()}
                            </div>
                            <span className="hidden sm:block">{auth.user?.name}</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
```

---

## STEP 4.2 — Create Shared Components

Files to create (see `skills/react-inertia.md` for code):

- `Components/FlashMessage.jsx` — flash toast notifications
- `Components/StatusBadge.jsx` — colored status pill
- `Components/Pagination.jsx` — Inertia pagination
- `Components/Booking/StepIndicator.jsx` — wizard step bar
- `Components/Booking/ConfirmationCode.jsx` — code display with copy

---

## STEP 4.3 — Create Public Pages

### Pages/Public/Home.jsx
Key sections:
1. Hero: large headline, "Réserver maintenant" button → `route('booking.create')`
2. Services grid: map over `serviceTypes` prop → `ServiceCard` component
3. How it works: 3 steps (Réserver → Confirmer → Technicien arrive)
4. Emergency CTA: phone number in large text with Phone icon
5. Testimonials: static 3 testimonials

### Pages/Public/Services.jsx
- Full grid of all active service types
- Each card: icon, name, description, duration badge
- "Réserver ce service" button → `route('booking.create')`

### Pages/Public/Booking/Create.jsx
3-step wizard — see `skills/react-inertia.md → Page Component Template`

Step 1: Service selection cards
Step 2: Date + time slots + contact form (name, phone, email, address, city, notes)
Step 3: Review summary + submit

### Pages/Public/Booking/Confirm.jsx
```jsx
// Afficher la confirmation après soumission réussie
import { Head, Link } from '@inertiajs/react'
import { CheckCircle, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { ConfirmationCode } from '@/Components/Booking/ConfirmationCode'

export default function BookingConfirm({ booking }) {
    const nextSteps = [
        { icon: Phone,    text: 'Notre équipe vous appellera dans les 24h pour confirmer.' },
        { icon: Calendar, text: 'Le technicien se présentera à l\'heure convenue.' },
        { icon: CheckCircle, text: 'Le devis sera remis sur place avant toute intervention.' },
    ]

    return (
        <PublicLayout>
            <Head title="Réservation confirmée" />
            <div className="min-h-screen bg-slate-50 py-16">
                <div className="max-w-lg mx-auto px-4 text-center">

                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Demande envoyée !
                    </h1>
                    <p className="text-slate-500 mb-8">
                        Votre code de référence :
                    </p>

                    <ConfirmationCode code={booking.confirmation_code} />

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-8 text-left space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                            <Calendar size={16} className="text-blue-600 flex-shrink-0" />
                            <span>{booking.booking_date} à {booking.booking_time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                            <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                            <span>{booking.city}</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4 text-left">
                        <h2 className="font-semibold text-slate-900">Prochaines étapes</h2>
                        {nextSteps.map(({ icon: Icon, text }, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon size={16} className="text-blue-600" />
                                </div>
                                <p className="text-sm text-slate-600 pt-1">{text}</p>
                            </div>
                        ))}
                    </div>

                    <Link href={route('home')}
                        className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </PublicLayout>
    )
}
```

---

## STEP 4.4 — Create Client Pages

### Pages/Client/Dashboard.jsx
- List of client's bookings (from `bookings` prop)
- Status badge per booking
- Cancel button (only if status === 'pending')
- "Nouvelle réservation" button

---

## PHASE 4 CHECKLIST

- [ ] PublicLayout with sticky navbar, mobile menu, footer
- [ ] AdminLayout with sidebar, top bar, role-based nav
- [ ] FlashMessage, StatusBadge, Pagination, StepIndicator, ConfirmationCode components
- [ ] Home page with all sections
- [ ] Services page with service cards
- [ ] Booking Create — 3-step wizard with validation
- [ ] Booking Confirm — confirmation code display
- [ ] Client Dashboard — bookings list with actions
- [ ] All pages use `<Head title="..." />` for SEO
- [ ] All pages are responsive (mobile-first)
- [ ] Form submit shows loading state via `processing`
- [ ] Validation errors display under each field

**✅ Phase 4 complete — proceed to Phase 5 (Admin Panel)**
