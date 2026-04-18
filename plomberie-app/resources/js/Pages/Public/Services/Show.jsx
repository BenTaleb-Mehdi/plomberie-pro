import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { Wrench, CheckCircle2, ArrowLeft, Clock, ShieldCheck, Mail } from 'lucide-react'
import BlurText from '@/Components/ReactBits/BlurText'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'

export default function ServiceShow({ service }) {
    return (
        <PublicLayout>
            <Head title={`Plomberie Pro — ${service.name}`} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.15),transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link href={route('services.index')} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-12 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all group-hover:scale-110 shadow-lg">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-bold text-[10px] uppercase tracking-[0.3em]">Retour aux services</span>
                    </Link>
                    
                    <div className="max-w-3xl">
                        <BlurText 
                            text={service.name}
                            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
                            delay={80}
                        />
                        <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed max-w-2xl">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                                <Clock className="text-blue-500" size={16} /> ~{service.duration_minutes} min
                            </div>
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                                <ShieldCheck className="text-emerald-500" size={16} /> Garanti 1 An
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-16">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Pourquoi choisir ce service ?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: 'Intervention Rapide', desc: 'Nos équipes interviennent en moins de 30 minutes.' },
                                        { title: 'Matériel de Qualité', desc: 'Nous utilisons uniquement des pièces certifiées.' },
                                        { title: 'Transparence Prix', desc: 'Devis clair et fixe avant toute intervention.' },
                                        { title: 'Nettoyage Inclus', desc: 'Nous laissons votre espace de travail impeccable.' },
                                    ].map((feature, i) => (
                                        <SpotlightCard key={i} className="rounded-3xl h-full shadow-lg shadow-slate-100/50">
                                            <div className="flex gap-5 p-8 h-full bg-white border border-slate-100 group">
                                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transition-transform group-hover:scale-110">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    ))}
                                </div>
                            </div>

                            <div className="p-12 bg-blue-600 rounded-[3rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                                <h2 className="text-3xl font-black mb-6 tracking-tight relative z-10 italic">"Une urgence ne peut pas attendre demain."</h2>
                                <p className="text-lg text-blue-100 font-medium mb-10 relative z-10">Nos techniciens sont formés aux dernières technologies pour résoudre votre problème de {service.name.toLowerCase()} rapidement et durablement.</p>
                                <Link href={route('booking.create')} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-black rounded-2xl shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all active:scale-95 relative z-10 uppercase tracking-widest text-sm">
                                    Réserver Maintenant
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-200">
                                <h3 className="text-xl font-black mb-8 leading-tight tracking-tight">Prêt pour une intervention ?</h3>
                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><CheckCircle2 className="text-emerald-500" size={20} /></div>
                                        <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Devis gratuit</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><CheckCircle2 className="text-emerald-500" size={20} /></div>
                                        <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Paiement Sécurisé</span>
                                    </div>
                                </div>
                                <Link href={route('booking.create')} className="w-full inline-flex items-center justify-center py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors uppercase tracking-widest text-sm mb-4">
                                    Réserver ce service
                                </Link>
                                <p className="text-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">Temps de réponse : &lt; 30 min</p>
                            </div>

                            <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Mail size={24} className="text-blue-600" /> Besoin d'un conseil ?</h3>
                                <p className="text-sm font-medium text-slate-600 mb-8 leading-relaxed">Si vous n'êtes pas sûr du type d'intervention nécessaire, contactez nos experts pour un diagnostic gratuit.</p>
                                <Link href={route('contact.index')} className="w-full inline-flex items-center justify-center py-5 bg-white border-2 border-slate-200 text-slate-900 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all uppercase tracking-widest text-sm translate-y-0 active:scale-95">
                                    Contactez-nous
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
