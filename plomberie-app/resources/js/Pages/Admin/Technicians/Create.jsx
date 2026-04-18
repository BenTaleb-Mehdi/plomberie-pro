import { Head, useForm, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Wrench, User, Phone, Mail, Lock, 
    MapPin, FileText, ArrowLeft, Save,
    CheckCircle2
} from 'lucide-react'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        specialty: '',
        zone: '',
        bio: '',
        is_available: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.technicians.store'))
    }

    return (
        <AdminLayout title="Ajouter un Technicien">
            <Head title="Admin — Nouveau Technicien" />

            <Link href={route('admin.technicians.index')} className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors mb-10 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour à la liste
            </Link>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <SpotlightCard className="rounded-[3rem] bg-white border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-8 md:p-10 relative group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                                    
                                    <h2 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                            <User size={20} />
                                        </div>
                                        Informations Personnelles
                                    </h2>

                                    <div className="space-y-6 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Nom Complet</label>
                                                <input 
                                                    type="text" 
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                    placeholder="Prénom Nom"
                                                />
                                                {errors.name && <p className="mt-2 text-xs font-bold text-red-500">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Téléphone</label>
                                                <input 
                                                    type="tel" 
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                    placeholder="06 XX XX XX XX"
                                                />
                                                {errors.phone && <p className="mt-2 text-xs font-bold text-red-500">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Email Professionnel</label>
                                            <input 
                                                type="email" 
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                placeholder="technicien@plomberie.com"
                                            />
                                            {errors.email && <p className="mt-2 text-xs font-bold text-red-500">{errors.email}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1 flex items-center gap-2">
                                                    <Lock size={12} className="text-blue-600" /> Mot de passe
                                                </label>
                                                <input 
                                                    type="password" 
                                                    value={data.password}
                                                    onChange={e => setData('password', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                />
                                                {errors.password && <p className="mt-2 text-xs font-bold text-red-500">{errors.password}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Confirmation</label>
                                                <input 
                                                    type="password" 
                                                    value={data.password_confirmation}
                                                    onChange={e => setData('password_confirmation', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="rounded-[3rem] bg-white border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-8 md:p-10">
                                    <h2 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                            <Wrench size={20} />
                                        </div>
                                        Expertise Métier
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Spécialité</label>
                                                <input 
                                                    type="text" 
                                                    value={data.specialty}
                                                    onChange={e => setData('specialty', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                    placeholder="ex: Installation Sanitaire"
                                                />
                                                {errors.specialty && <p className="mt-2 text-xs font-bold text-red-500">{errors.specialty}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Zone d'intervention</label>
                                                <input 
                                                    type="text" 
                                                    value={data.zone}
                                                    onChange={e => setData('zone', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                                    placeholder="ex: Tanger Centre, Gzenaya"
                                                />
                                                {errors.zone && <p className="mt-2 text-xs font-bold text-red-500">{errors.zone}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Bio / Présentation</label>
                                            <textarea 
                                                rows="4"
                                                value={data.bio}
                                                onChange={e => setData('bio', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-medium transition-all outline-none resize-none"
                                                placeholder="Une brève description du profil..."
                                            ></textarea>
                                            {errors.bio && <p className="mt-2 text-xs font-bold text-red-500">{errors.bio}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                                <h3 className="text-lg font-black mb-6 relative z-10">Statut Équipe</h3>
                                
                                <label className="flex items-center gap-4 cursor-pointer group/toggle relative z-10 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            checked={data.is_available}
                                            onChange={e => setData('is_available', e.target.checked)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest">Actif & Disponible</span>
                                </label>

                                <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-dashed border-white/10 opacity-60">
                                    <p className="text-[10px] font-bold leading-relaxed uppercase tracking-widest">Un technicien actif peut être assigné aux nouvelles réservations arrivantes.</p>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2.5rem] shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
                            >
                                {processing ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Save size={24} /> Enregistrer Profi</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
