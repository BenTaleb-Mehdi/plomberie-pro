import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { Menu, X, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react'

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props
    const user = auth.user
    const [mobileOpen, setMobileOpen]   = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const logout = () => router.post(route('logout'))

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* ── Nav ── */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center h-15 gap-8" style={{ height: '60px' }}>

                        {/* Logo */}
                        <Link href="/" className="shrink-0 flex items-center gap-2">
                            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/>
                                    <path d="M12 2c0 5.5-4.5 10-10 10"/>
                                </svg>
                            </div>
                            <span className="font-semibold text-sm text-gray-900 tracking-tight">Tanger Plomberie</span>
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden sm:flex items-center gap-1">
                            <Link
                                href={route('dashboard')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    route().current('dashboard')
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <LayoutDashboard size={14} className={route().current('dashboard') ? 'text-blue-600' : 'text-gray-400'} />
                                Dashboard
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="ml-auto flex items-center gap-3">

                            {/* User dropdown — desktop */}
                            <div className="hidden sm:block relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 font-semibold text-xs uppercase overflow-hidden">
                                        {user?.profile_photo_url ? (
                                            <img src={user.profile_photo_url} className="w-full h-full object-cover" alt="" />
                                        ) : user?.name?.[0]}
                                    </div>
                                    <span>{user?.name}</span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                        <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <User size={14} className="text-gray-400" />
                                                Mon profil
                                            </Link>
                                            <div className="mx-3 my-1 h-px bg-gray-100" />
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            >
                                                <LogOut size={14} className="text-gray-400" />
                                                Déconnexion
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="sm:hidden p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="sm:hidden border-t border-gray-100 px-4 py-3 space-y-1">
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                route().current('dashboard')
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <LayoutDashboard size={15} />
                            Dashboard
                        </Link>

                        <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
                            <div className="px-3 py-2 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-sm uppercase">
                                    {user?.name?.[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                <User size={15} className="text-gray-400" />
                                Mon profil
                            </Link>
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            >
                                <LogOut size={15} className="text-gray-400" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page header slot */}
            {header && (
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 py-5">
                        {header}
                    </div>
                </div>
            )}

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}
