import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Menu, X, Phone, Mail, MapPin, Droplets } from 'lucide-react'
import { FlashMessage } from '@/Components/FlashMessage'

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled]     = useState(false)
    const { auth } = usePage().props

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const navLinks = [
        { label: 'Accueil',      name: 'home' },
        { label: 'Services',     name: 'services.index' },
        { label: 'Réalisations', name: 'projects.index' },
        { label: 'Contact',      name: 'contact.index' },
    ]

    /* ─── nav colour helpers ─── */
    const navBase   = 'text-gray-500 hover:text-gray-900'
    const logoText  = 'text-gray-900'
    const logoSub   = 'text-blue-600'

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
            <FlashMessage />

            {/* ── Navbar ── */}
            <header className="fixed top-4 inset-x-0 z-[100] px-4 md:px-8 pointer-events-none">
                <div className={`mx-auto max-w-7xl transition-all duration-500 rounded-2xl pointer-events-auto ${
                    scrolled
                        ? 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] py-3.5 px-6'
                        : 'bg-transparent py-3 px-2 lg:px-4'
                }`}>
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <Link href={route('home')} className="flex items-center gap-2.5 shrink-0 group">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 group-hover:shadow-blue-600/40">
                                <Droplets size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${logoText}`}>
                                    Tanger Plomberie
                                </span>
                                <span className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${logoSub}`}>
                                    Expertise Maroc
                                </span>
                            </div>
                        </Link>

                        {/* Desktop links */}
                        <nav className="hidden md:flex items-center gap-8 ml-4">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={route(link.name)}
                                    className={`text-[13px] font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${navBase}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA area — pushed right */}
                        <div className="hidden md:flex items-center gap-3 ml-auto">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-[13px] font-medium px-4 py-2 rounded-xl transition-colors duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                >
                                    Mon espace
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="text-[13px] font-medium px-4 py-2 rounded-xl transition-colors duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                >
                                    Connexion
                                </Link>
                            )}

                            <Link
                                href={route('booking.create')}
                                className="text-[13px] font-bold tracking-wide px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5"
                            >
                                Réserver
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            className="md:hidden ml-auto p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                {mobileOpen && (
                    <div className="md:hidden bg-white border border-gray-100 mt-2 rounded-2xl px-6 py-6 space-y-1 shadow-xl">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={route(link.name)}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Mon espace
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Connexion
                                </Link>
                            )}
                            <Link
                                href={route('booking.create')}
                                onClick={() => setMobileOpen(false)}
                                className="block text-center px-3 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Réserver en ligne
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* ── Footer ── */}
            <footer className="bg-[#0b101e] text-slate-400 relative overflow-hidden font-sans border-t border-slate-900 shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]">
                {/* Subtle dark lux gradient glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Top strip — emergency CTA */}
                <div className="border-b border-slate-800/50 relative z-10">
                    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                                <Phone size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg tracking-tight mb-0.5">Urgence plomberie ?</p>
                                <p className="text-slate-500 text-sm">Disponible 24h/7j — Intervention garantie en moins de 2h</p>
                            </div>
                        </div>
                        <a
                            href="tel:+21200000000"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold tracking-wide rounded-xl transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 shrink-0"
                        >
                            <Phone size={16} />
                            +212 5XX XX XX XX
                        </a>
                    </div>
                </div>

                {/* Main grid */}
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 relative z-10">

                    {/* Brand col */}
                    <div className="md:col-span-5 lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                                <Droplets size={18} className="text-white" strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-white text-lg tracking-tight">Tanger Plomberie</span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-slate-500 max-w-sm">
                            Le partenaire d'excellence pour la plomberie d'urgence et l'installation haut de gamme à Tanger.
                            Techniciens certifiés, satisfaction garantie.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                            ].map((s, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-slate-800 hover:text-white flex items-center justify-center text-slate-400 transition-all">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3 lg:col-span-2 lg:ml-auto">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-2">
                            <span className="w-2 h-0.5 bg-blue-600 rounded"></span> Navigation
                        </h4>
                        <ul className="space-y-4">
                            {['Accueil','Services','Réalisations','Contact'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-[15px] font-medium text-slate-500 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-2">
                            <span className="w-2 h-0.5 bg-emerald-500 rounded"></span> Nos Services
                        </h4>
                        <ul className="space-y-4">
                            {["Fuite d'eau & Urgences","Débouchage canalisations","Installation sanitaire","Chauffe-eau électrique","Rénovation salle de bain"].map(s => (
                                <li key={s}>
                                    <span className="text-[15px] font-medium text-slate-500 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-12 lg:col-span-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-6 flex items-center gap-2">
                            <span className="w-2 h-0.5 bg-blue-600 rounded"></span> Contact
                        </h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3.5 group cursor-pointer">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors">
                                    <Phone size={14} className="text-blue-400 group-hover:text-blue-300" />
                                </div>
                                <div className="pt-0.5">
                                    <p className="text-[15px] text-slate-300 font-bold group-hover:text-white transition-colors">+212 6XX XXX XXX</p>
                                    <p className="text-xs text-slate-500 mt-1">Appel direct & WhatsApp</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3.5 group cursor-pointer">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors mt-0.5">
                                    <Mail size={14} className="text-blue-400 group-hover:text-blue-300" />
                                </div>
                                <p className="text-[15px] text-slate-500 group-hover:text-white transition-colors pt-1.5">contact@plomberiepro.ma</p>
                            </li>
                            <li className="flex items-start gap-3.5 group cursor-pointer">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors mt-0.5">
                                    <MapPin size={14} className="text-blue-400 group-hover:text-blue-300" />
                                </div>
                                <p className="text-[15px] text-slate-500 leading-relaxed group-hover:text-white transition-colors pt-1.5">Blvd Mohammed V,<br />Tanger, Maroc</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800/60 bg-slate-950/50 relative z-10">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] font-medium text-slate-600">
                        <p>© {new Date().getFullYear()} Tanger Plomberie — Tous droits réservés.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-slate-400 transition-colors">Mentions légales</Link>
                            <Link href="#" className="hover:text-slate-400 transition-colors">Politique de confidentialité</Link>
                            <Link href="#" className="hover:text-slate-400 transition-colors">CGU</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
