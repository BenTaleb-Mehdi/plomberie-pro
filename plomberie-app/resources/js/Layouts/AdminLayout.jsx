import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
    LayoutDashboard, CalendarDays, Users, Wrench,
    BarChart3, MessageSquare, Settings, LogOut,
    Menu, X, Bell, Droplets, Search, LayoutGrid,
} from 'lucide-react'
import { FlashMessage } from '@/Components/FlashMessage'

const navItems = [
    { label: 'Dashboard',    href: 'admin.dashboard',        icon: LayoutDashboard },
    { label: 'Réservations', href: 'admin.bookings.index',   icon: CalendarDays },
    { label: 'Techniciens',  href: 'admin.technicians.index',icon: Wrench },
    { label: 'Clients',      href: 'admin.clients.index',    icon: Users },
    { label: 'Services',     href: 'admin.services.index',   icon: Settings },
    { label: 'Réalisations', href: 'admin.projects.index',   icon: LayoutGrid },
    { label: 'Rapports',     href: 'admin.reports.index',    icon: BarChart3 },
    { label: 'Messages',     href: 'admin.contacts.index',   icon: MessageSquare },
]

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { auth } = usePage().props
    const logout = () => router.post(route('logout'))

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
            <FlashMessage />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex
            `}>

                {/* Brand */}
                <div className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100 flex-shrink-0">
                    <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                        <Droplets size={14} className="text-white" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-semibold text-gray-900 text-sm tracking-tight">AdminPro</span>
                        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-blue-500 mt-0.5">Console</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 overflow-y-auto py-5 px-3 slim-scroll">
                    <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                        Menu
                    </p>
                    <nav className="space-y-0.5">
                        {navItems.map((item) => {
                            const active = route().current(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={route(item.href)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                                        active
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon
                                        size={16}
                                        strokeWidth={active ? 2.5 : 2}
                                        className={active ? 'text-blue-600' : 'text-gray-400'}
                                    />
                                    {item.label}
                                    {active && (
                                        <div className="ml-auto w-1 h-1 bg-blue-600 rounded-full" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                            Réglages
                        </p>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <Settings size={16} className="text-gray-400" />
                            Configuration
                        </Link>
                    </div>
                </div>

                {/* User card */}
                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm uppercase overflow-hidden">
                            {auth.user?.profile_photo_url ? (
                                <img src={auth.user.profile_photo_url} className="w-full h-full object-cover" alt="" />
                            ) : auth.user?.name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{auth.user?.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Admin</p>
                        </div>
                        <button
                            onClick={logout}
                            title="Déconnexion"
                            className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                        >
                            <LogOut size={15} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* ── Main area ── */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

                {/* Top bar */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-6 flex-shrink-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Menu size={18} />
                    </button>

                    {/* Search */}
                    <div className="hidden md:flex items-center relative flex-1 max-w-sm">
                        <Search size={14} className="absolute left-3.5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Rechercher…"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-lg pl-9 pr-4 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                        />
                    </div>

                    {/* Right actions */}
                    <div className="ml-auto flex items-center gap-2">
                        <button className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full ring-1 ring-white" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            <MessageSquare size={18} />
                        </button>

                        <div className="w-px h-5 bg-gray-200 mx-1" />

                        <div className="flex items-center gap-2.5">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-semibold text-gray-900 leading-none">{auth.user?.name}</p>
                                <p className="text-[10px] text-emerald-500 font-medium mt-0.5">En ligne</p>
                            </div>
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-sm uppercase overflow-hidden">
                                {auth.user?.profile_photo_url ? (
                                    <img src={auth.user.profile_photo_url} className="w-full h-full object-cover" alt="" />
                                ) : auth.user?.name?.[0]}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Viewport */}
                <div className="flex-1 overflow-y-auto p-8 slim-scroll">
                    {title && (
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
                            <div className="mt-1.5 h-px w-12 bg-blue-600 rounded-full" />
                        </div>
                    )}
                    <div className="animate-in fade-in duration-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
