import { Head, Link } from '@inertiajs/react'
import { Droplets, Phone, ShieldCheck, Clock, CheckCircle2, Star, ArrowRight, Zap, MapPin } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { ServiceCard } from '@/Components/Public/ServiceCard'
import SplitText from '@/Components/ReactBits/SplitText'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import CountUp from '@/Components/ReactBits/CountUp'

/* ─── static data (outside component = no re-alloc on render) ─── */
const FEATURES = [
    { icon: Clock,       title: 'Disponible 24h/7j',   desc: 'Urgences traitées à toute heure.' },
    { icon: ShieldCheck, title: 'Travail Garanti',      desc: 'Qualité certifiée, résultats durables.' },
    { icon: Droplets,    title: 'Devis 100 % Gratuit',  desc: 'Pas de surprise sur la facture.' },
]

const TRUST = [
    'Techniciens certifiés',
    'Intervention en moins de 2h',
    'Garantie pièces & main d\'œuvre',
    'Devis transparent sans frais',
]

export default function Home({ services = [], featuredProjects = [] }) {
    const steps = [
        { title: 'Réserver',   desc: 'Choisissez votre service et créneau en 2 minutes.', icon: Droplets },
        { title: 'Confirmer', desc: 'Notre équipe valide les détails de l\'intervention.', icon: ShieldCheck },
        { title: 'Réparer',    desc: 'Un technicien arrive à l\'heure pour les travaux.',  icon: Zap },
    ]

    const stats = [
        { label: 'Interventions', value: 1500, suffix: '+' },
        { label: 'Techniciens',    value: 25, suffix: '' },
        { label: 'Villes',          value: 9, suffix: '' },
        { label: 'Satisfaction',  value: 99, suffix: '%' },
    ]

    return (
        <PublicLayout>
            <Head title="Tanger Plomberie — Expertise & Dépannage 24h/7j" />

            {/* ══════════════════════════
                HERO — white & clean
            ══════════════════════════ */}
            <section className="relative w-full min-h-screen flex items-center bg-white pt-28 pb-20 overflow-hidden">
                {/* Subtle dot-grid background — pure CSS, zero network cost */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative w-full max-w-[1500px] mx-auto px-6 lg:px-12 shrink-0">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                        {/* ── Left text col ── */}
                        <div className="space-y-7 lg:col-span-7">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span className="text-[11px] font-semibold text-blue-700 tracking-wide uppercase">
                                    Service Premium — Tanger, Maroc
                                </span>
                            </div>

                            {/* H1 */}
                            <h1 className="text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-slate-900 leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
                                L'expertise plomberie{' '}
                                <span className="text-blue-600">de référence</span>{' '}
                                à Tanger.
                            </h1>

                            {/* Sub-heading */}
                            <p className="text-lg text-slate-500 leading-relaxed max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                Installations, urgences et rénovations par des techniciens
                                certifiés. Intervention rapide, devis gratuit.
                            </p>

                            {/* Trust checklist */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                                {TRUST.map(t => (
                                    <li key={t} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                                        {t}
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3 pt-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
                                <Link
                                    href={route('booking.create')}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                                >
                                    Prendre rendez-vous
                                    <ArrowRight size={16} />
                                </Link>
                                <a
                                    href="tel:+21200000000"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
                                >
                                    <Phone size={16} className="text-blue-600" />
                                    Appeler maintenant
                                </a>
                            </div>
                        </div>

                        {/* ── Right visual col — Image Hero ── */}
                        <div className="hidden lg:block relative lg:col-span-5 animate-in fade-in zoom-in slide-in-from-right-10 duration-1000 delay-300">
                             <div className="relative px-6">
                                 {/* Decorative blobs */}
                                 <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                                 <div className="absolute -bottom-8 -left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                                 <div className="relative rounded-[3rem] overflow-hidden border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] group w-full h-[400px] lg:h-[600px] bg-slate-50 z-10">
                                    <img 
                                        src="/images/hero-plumber.png" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        alt="Expert Plombier Tanger" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                    
                                    {/* Info Floating component */}
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-xl flex items-center gap-4 border border-white/50 group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
                                            <ShieldCheck size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Satisfaction</p>
                                            <p className="text-lg font-black text-slate-900 tracking-tight leading-none mt-1">Garantie 1 An</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats section */}
            <section className="bg-white py-12 border-y border-slate-50">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group border-r last:border-0 border-slate-100 flex flex-col justify-center">
                            <p className="text-4xl font-black text-slate-900 mb-1 tracking-tighter group-hover:text-blue-600 transition-colors">
                                <CountUp to={stat.value} />{stat.suffix}
                            </p>
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Services */}
            <section className="py-24 bg-slate-50/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-3">Nos Expertises</p>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight max-w-md leading-tight">
                                Services de Plomberie Complètes au Maroc
                            </h2>
                        </div>
                        <Link href={route('services.index')} 
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 group outline-none">
                            Tous les services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? (
                            services.map(service => (
                                <ServiceCard key={service.id} service={service} />
                            ))
                        ) : (
                            // Loading state / Fallback cards
                            [1,2,3].map(i => (
                                <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Last Projects Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <p className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] mb-3">Portfolio</p>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight max-w-md leading-tight">
                                Nos Dernières Réalisations
                            </h2>
                        </div>
                        <Link href={route('projects.index')} 
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 group outline-none">
                            Voir le portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <SpotlightCard key={project.id} spotlightColor="rgba(59, 130, 246, 0.15)" className="p-2 bg-white rounded-[2.5rem] border border-slate-100/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <Link href={route('projects.show', project.id)} className="block relative group flex-col overflow-hidden rounded-[2rem] aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                                    {/* Image background */}
                                    <img 
                                        src={project.main_image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                        alt={project.title} 
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Category pill */}
                                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white">{project.category}</span>
                                    </div>

                                    {/* Content (Bottom) */}
                                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                        <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-300 transition-colors tracking-tight leading-none pr-4">
                                            {project.title}
                                        </h3>
                                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shrink-0 shadow-xl shadow-blue-500/30">
                                            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process / How it works */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="text-center mb-20 max-w-lg mx-auto">
                        <p className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] mb-3">Simplicité</p>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                            Votre satisfaction en 3 étapes simples
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-[35%] left-0 w-full h-[2px] bg-slate-50 hidden md:block z-0 px-24"></div>
                        
                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 mb-8">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials or Trust section */}
            <section className="py-24 bg-blue-600 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white/5 rounded-full rotate-12"></div>
                
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <p className="text-blue-200 font-black uppercase tracking-[0.2em] text-xs mb-8">Témoignage Client</p>
                    <div className="text-white mb-10 flex justify-center gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
                    </div>
                    <blockquote className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-12 italic">
                        "Un service exceptionnel à Tanger ! Le technicien est arrivé 30 min après mon appel pour une fuite grave."
                    </blockquote>
                    <p className="text-blue-100 font-bold uppercase tracking-widest">— Amine B., Résident Tanger</p>
                </div>
            </section>
            
            {/* CTA Final */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative group">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover:opacity-60 transition-opacity"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl group-hover:opacity-60 transition-opacity"></div>
                        
                        <div className="relative z-10 max-w-md text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                                Prêt à régler votre problème de plomberie ?
                            </h2>
                            <p className="text-slate-400 font-medium">
                                Réservez en moins de 2 minutes et obtenez un devis gratuit sur place.
                            </p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                            <Link href={route('booking.create')}
                                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-center">
                                Réserver mon intervention
                            </Link>
                            <Link href={route('contact.index')}
                                className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all text-center">
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }
            `}} />
        </PublicLayout>
    )
}
