import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { ServiceCard } from '@/Components/Public/ServiceCard'
import { Search } from 'lucide-react'
import { useState } from 'react'
import BlurText from '@/Components/ReactBits/BlurText'

export default function Services({ services = [] }) {
    const [search, setSearch] = useState('')

    const filteredServices = services.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <PublicLayout>
            <Head title="Nos Services de Plomberie — Plomberie Pro" />

            {/* Header section */}
            <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Plomberie Pro Maroc</p>
                    <BlurText 
                        text="Nos Expertises Métier"
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8"
                        delay={100}
                    />
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        De l'installation complexe à l'urgence immédiate, nos techniciens 
                        certifiés couvrent l'ensemble de vos besoins sanitaires.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 pb-24">
                {/* Search Bar */}
                <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-slate-900/10 border border-slate-100 mb-16 max-w-2xl mx-auto flex items-center gap-4 group">
                    <div className="flex-1 relative">
                        <Search size={22} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${search ? 'text-blue-600' : 'text-slate-400'}`} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un service (fuite, chauffe-eau...)" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-medium transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold text-lg">Aucun service ne correspond à votre recherche.</p>
                        <button 
                            onClick={() => setSearch('')}
                            className="mt-4 text-blue-600 font-black uppercase tracking-widest text-xs"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Besoin d'un service sur-mesure ?</h2>
                    <p className="text-slate-500 mb-10 max-w-xl mx-auto">
                        Si vous ne trouvez pas exactement ce que vous cherchez, contactez-nous 
                        pour obtenir un devis personnalisé gratuitement.
                    </p>
                    <Link href={route('contact.index')}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-slate-200 text-slate-800 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-xl shadow-slate-200/50">
                        Demander un devis gratuit
                    </Link>
                </div>
            </div>
        </PublicLayout>
    )
}
