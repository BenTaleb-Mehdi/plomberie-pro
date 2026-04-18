import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { 
    Calendar, MapPin, ArrowLeft, 
    CheckCircle2, Clock, ShieldCheck, 
    ChevronLeft, ChevronRight, Image as ImageIcon 
} from 'lucide-react'
import { useState } from 'react'
import SplitText from '@/Components/ReactBits/SplitText'

export default function ProjectShow({ project }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const gallery = [project.main_image, ...(project.gallery || [])]

    return (
        <PublicLayout>
            <Head title={`${project.title} — Réalisations Plomberie Pro`} />

            <section className="pt-32 pb-24 bg-slate-900 border-b border-white/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.15),transparent_50%)]"></div>
                 <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link href={route('projects.index')} className="inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all mb-12 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all group-hover:scale-110">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Retour au portfolio</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-3xl">
                            <SplitText 
                                text={project.title}
                                className="text-4xl md:text-7xl font-black text-white leading-none mb-8 tracking-tighter"
                                delay={0.05}
                            />
                            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80">
                                <span className="flex items-center gap-2"><MapPin size={14} /> {project.city || 'Tanger'}</span>
                                <span className="flex items-center gap-2"><Calendar size={14} /> Réalisé en 2024</span>
                                <span className="flex items-center gap-2"><CheckCircle2 size={14} /> Projet Réussi</span>
                            </div>
                        </div>
                        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                             <div className="text-center px-6 border-r border-white/5">
                                 <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Durée</p>
                                 <p className="text-lg font-black text-white">4h</p>
                             </div>
                             <div className="text-center px-6">
                                 <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Impact</p>
                                 <p className="text-lg font-black text-white">Critical</p>
                             </div>
                        </div>
                    </div>
                 </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Gallery Column */}
                        <div className="lg:col-span-8 space-y-10">
                            <div className="relative aspect-[16/9] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-50 group">
                                 <img 
                                    src={gallery[activeIndex]} 
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-opacity duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <p className="text-white text-xs font-black uppercase tracking-[0.2em] bg-blue-600/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                                        Vue détaillée #{activeIndex + 1}
                                     </p>
                                </div>

                                {gallery.length > 1 && (
                                    <>
                                        <button 
                                            onClick={() => setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button 
                                            onClick={() => setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                                            <ChevronRight size={32} />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                {gallery.map((img, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setActiveIndex(i)}
                                        className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all hover:scale-105 active:scale-95
                                            ${activeIndex === i ? 'border-blue-600 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            <div className="pt-20 border-t border-slate-100">
                                <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Rapport d'Intervention</h3>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-3xl">
                                    {project.description}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-start gap-6">
                                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><CheckCircle2 size={24} /></div>
                                         <div>
                                             <h4 className="font-bold text-slate-900 mb-1">Diagnostic Effectué</h4>
                                             <p className="text-sm text-slate-500">Analyse complète des infrastructures et détection des fuites invisibles.</p>
                                         </div>
                                     </div>
                                     <div className="p-8 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100/50 flex items-start gap-6">
                                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><ShieldCheck size={24} /></div>
                                         <div>
                                             <h4 className="font-bold text-slate-900 mb-1">Matériel de Pointe</h4>
                                             <p className="text-sm text-slate-500">Utilisation d'accessoires certifiés NF et durables pour une longévité maximale.</p>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                                <h3 className="text-xl font-black mb-8 tracking-tight">À votre tour ?</h3>
                                <p className="text-slate-400 font-medium mb-10 leading-relaxed text-sm">Nous pouvons réaliser la même qualité d'intervention chez vous, dès aujourd'hui.</p>
                                <Link href={route('booking.create')} className="w-full inline-flex items-center justify-center py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs shadow-xl active:scale-95 mb-6 shadow-blue-500/20">
                                    Réserver mon expert
                                </Link>
                                <Link href={route('contact.index')} className="w-full inline-flex items-center justify-center py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                                    Demander un Devis
                                </Link>
                            </div>

                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                    <Clock size={16} /> Fin de chantier : 17:30
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Détails Techniques</h4>
                                <ul className="space-y-4">
                                     {[
                                         { label: 'Type', val: project.category },
                                         { label: 'Pression', val: '4.2 Bar' },
                                         { label: 'Tuyauterie', val: 'Multicouche' },
                                         { label: 'Région', val: project.city },
                                     ].map((item, i) => (
                                         <li key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                             <span className="text-sm font-black text-slate-800">{item.val}</span>
                                         </li>
                                     ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
