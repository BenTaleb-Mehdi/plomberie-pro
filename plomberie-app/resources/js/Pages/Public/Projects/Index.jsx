import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { 
    Image as ImageIcon, 
    Calendar, MapPin, ArrowRight, 
    Layers, ExternalLink 
} from 'lucide-react'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import SplitText from '@/Components/ReactBits/SplitText'

export default function ProjectsIndex({ projects }) {
    return (
        <PublicLayout>
            <Head title="Nos Réalisations — Plomberie Pro" />

            {/* Header */}
            <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Portfolio</p>
                    <SplitText 
                        text="Nos Dernières Interventions"
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    />
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Découvrez la qualité de notre travail à travers une sélection de projets récents réalisés pour nos clients résidentiels et professionnels.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.data.map((project) => (
                            <SpotlightCard key={project.id} className="rounded-[2.5rem] group">
                                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                                    <div className="relative aspect-video overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                                        <img 
                                            src={project.main_image} 
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                {project.category || 'Intervention'}
                                            </span>
                                        </div>
                                        {project.gallery?.length > 0 && (
                                            <div className="absolute bottom-4 right-4">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/40 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/10">
                                                    <Layers size={14} /> +{project.gallery.length} photos
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-tighter text-slate-400">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> 2024</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {project.city || 'Tanger'}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1 line-clamp-2">
                                            {project.description}
                                        </p>
                                        
                                        <Link href={route('projects.show', project.id)} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group/link">
                                            Voir les détails <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* Pagination Placeholder */}
                    {projects.last_page > 1 && (
                        <div className="mt-20 flex justify-center">
                            {/* Pagination Logic */}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-blue-600 rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">Votre projet mérite cette qualité.</h2>
                        <p className="text-lg text-blue-100 font-medium mb-12 max-w-xl mx-auto">Rejoignez nos milliers de clients satisfaits et profitez d'une expertise certifiée au meilleur prix.</p>
                        <Link href={route('booking.create')} className="px-10 py-5 bg-white text-blue-600 font-black rounded-2xl shadow-2xl hover:shadow-white/20 transition-all active:scale-95 uppercase tracking-[0.2em] text-sm">
                            Prendre RDV en Ligne
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
