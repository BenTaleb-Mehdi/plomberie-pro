import { Head, Link } from '@inertiajs/react'
import {
    Phone, MapPin, Droplets, Wrench, Clock,
    ShieldCheck, ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'

/* ─── static data (outside component = no re-alloc on render) ─── */
const FEATURES = [
    { icon: Clock,       title: 'Disponible 24h/7j',   desc: 'Urgences traitées à toute heure.' },
    { icon: ShieldCheck, title: 'Travail Garanti',      desc: 'Qualité certifiée, résultats durables.' },
    { icon: Droplets,    title: 'Devis 100 % Gratuit',  desc: 'Pas de surprise sur la facture.' },
]

const SERVICES = [
    { title: 'Dépannage SOS',  tag: 'Urgence 24/7',  icon: Wrench,      color: 'bg-red-50   text-red-600   border-red-100' },
    { title: 'Sanitaire Pro',  tag: 'Installation',   icon: Droplets,    color: 'bg-blue-50  text-blue-600  border-blue-100' },
    { title: 'Thermique',      tag: 'Maintenance',    icon: ShieldCheck, color: 'bg-gray-100 text-gray-700  border-gray-200' },
    { title: "Design d'Eau",   tag: 'Rénovation',     icon: MapPin,      color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
]

const STATS = [
    { value: '2 000+', label: 'Interventions' },
    { value: '98 %',   label: 'Satisfaction' },
    { value: '24/7',   label: 'Disponibilité' },
    { value: '10 ans', label: "D'expérience" },
]

const TRUST = [
    'Techniciens certifiés',
    'Intervention en moins de 2h',
    'Garantie pièces & main-d\'œuvre',
    'Devis transparent sans frais',
]

export default function Welcome() {
    return (
        <PublicLayout>
            <Head>
                <title>Tanger Plomberie — Expertise & Dépannage 24h/7j</title>
                <meta name="description" content="Plomberie d'urgence et installation à Tanger. Techniciens certifiés disponibles 24h/7j. Devis gratuit en ligne." />
            </Head>

            {/* ══════════════════════════
                HERO — white & clean
            ══════════════════════════ */}
            <section className="bg-white pt-24 pb-20 overflow-hidden">
                {/* Subtle dot-grid background — pure CSS, zero network cost */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* ── Left text col ── */}
                        <div className="space-y-7">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span className="text-[11px] font-semibold text-blue-700 tracking-wide uppercase">
                                    Service Premium — Tanger, Maroc
                                </span>
                            </div>

                            {/* H1 */}
                            <h1 className="text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight">
                                L'expertise plomberie{' '}
                                <span className="text-blue-600">de référence</span>{' '}
                                à Tanger.
                            </h1>

                            {/* Sub-heading */}
                            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                                Installations, urgences et rénovations par des techniciens
                                certifiés. Intervention rapide, devis gratuit.
                            </p>

                            {/* Trust checklist */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {TRUST.map(t => (
                                    <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                                        {t}
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={route('booking.create')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
                                >
                                    Prendre rendez-vous
                                    <ArrowRight size={15} />
                                </Link>
                                <a
                                    href="tel:+21200000000"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-colors"
                                >
                                    <Phone size={15} className="text-blue-600" />
                                    Appeler maintenant
                                </a>
                            </div>
                        </div>

                        {/* ── Right visual col — CSS-only, no image load ── */}
                        <div className="hidden lg:block relative">

                            {/* Background ring */}
                            <div className="absolute -inset-8 rounded-[3rem] bg-blue-50/60" />

                            {/* Feature cards stacked */}
                            <div className="relative space-y-3 p-6">
                                {FEATURES.map((f, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                                            <f.icon size={20} className="text-white" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Stats mini-row */}
                                <div className="bg-gray-900 rounded-2xl p-5 grid grid-cols-3 gap-4 text-center">
                                    {[
                                        { v: '2 000+', l: 'Interventions' },
                                        { v: '98 %',   l: 'Satisfaction' },
                                        { v: '24/7',   l: 'Support' },
                                    ].map((s, i) => (
                                        <div key={i}>
                                            <p className="text-lg font-bold text-white">{s.v}</p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════
                STATS BAR
            ══════════════════════════ */}
            <section className="border-y border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((s, i) => (
                        <div key={i}>
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{s.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════
                SERVICES
            ══════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">Nos services</p>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Ce que nous faisons</h2>
                        </div>
                        <Link
                            href={route('services.index')}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                        >
                            Voir tout <ChevronRight size={15} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SERVICES.map((s, i) => (
                            <div
                                key={i}
                                className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-default"
                            >
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
                                    <s.icon size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.tag}</p>
                                    <h3 className="text-base font-semibold text-gray-900 tracking-tight">{s.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                                        Expertise artisanale pour vos besoins quotidiens.
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                                    En savoir plus <ChevronRight size={13} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════
                CTA BANNER
            ══════════════════════════ */}
            <section className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Besoin d'un plombier maintenant&nbsp;?</h2>
                        <p className="text-blue-200 mt-1 text-sm">Notre équipe intervient en moins de 2h sur Tanger.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 shrink-0">
                        <Link
                            href={route('booking.create')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors"
                        >
                            Réserver en ligne <ArrowRight size={15} />
                        </Link>
                        <a
                            href="tel:+21200000000"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-xl text-sm hover:bg-white/10 transition-colors"
                        >
                            <Phone size={15} />
                            +212 5XX XX XX XX
                        </a>
                    </div>
                </div>
            </section>

        </PublicLayout>
    )
}
