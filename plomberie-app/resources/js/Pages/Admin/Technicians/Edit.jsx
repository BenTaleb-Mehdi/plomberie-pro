import { Head, useForm, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Wrench, User, Phone, Mail, Lock, 
    MapPin, FileText, ArrowLeft, Save,
    CheckCircle2, Trash2
} from 'lucide-react'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import { router } from '@inertiajs/react'

export default function Edit({ technician }) {
    const { data, setData, put, processing, errors } = useForm({
        name: technician.user.name || '',
        email: technician.user.email || '',
        password: '',
        password_confirmation: '',
        phone: technician.user.phone || '',
        specialty: technician.specialty || '',
        zone: technician.zone || '',
        bio: technician.bio || '',
        is_available: technician.is_available,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.technicians.update', technician.id))
    }

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce technicien ? Cette action est irréversible.')) {
            router.delete(route('admin.technicians.destroy', technician.id))
        }
    }

    return (
        <AdminLayout title={`Modifier: ${technician.user.name}`}>
            <Head title={`Admin — Modifier ${technician.user.name}`} />

            <div className="flex items-center justify-between mb-10">
                <Link href={route('admin.technicians.index')} className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour à la liste
                </Link>
                
                <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-rose-500 font-black uppercase tracking-widest text-[10px] bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
                >
                    <Trash2 size={14} /> Supprimer le profil
                </button>
            </div>

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
                                        Compte Utilisateur
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
                                            />
                                            {errors.email && <p className="mt-2 text-xs font-bold text-red-500">{errors.email}</p>}
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 mt-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Laisser vide pour conserver le mot de passe actuel</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1 flex items-center gap-2">
                                                        <Lock size={12} className="text-amber-600" /> Nouveau mot de passe
                                                    </label>
                                                    <input 
                                                        type="password" 
                                                        value={data.password}
                                                        onChange={e => setData('password', e.target.value)}
                                                        className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none border-2 border-transparent focus:border-blue-600 shadow-inner"
                                                        placeholder="••••••••"
                                                    />
                                                    {errors.password && <p className="mt-2 text-xs font-bold text-red-500">{errors.password}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Confirmation</label>
                                                    <input 
                                                        type="password" 
                                                        value={data.password_confirmation}
                                                        onChange={e => setData('password_confirmation', e.target.value)}
                                                        className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none border-2 border-transparent focus:border-blue-600 shadow-inner"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
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
                                        Données Techniques
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Spécialité Principale</label>
                                                <input 
                                                    type="text" 
                                                    value={data.specialty}
                                                    onChange={e => setData('specialty', e.target.value)}
                                                    className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
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
                                                />
                                                {errors.zone && <p className="mt-2 text-xs font-bold text-red-500">{errors.zone}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Biographie</label>
                                            <textarea 
                                                rows="4"
                                                value={data.bio}
                                                onChange={e => setData('bio', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-medium transition-all outline-none resize-none"
                                            ></textarea>
                                            {errors.bio && <p className="mt-2 text-xs font-bold text-red-500">{errors.bio}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 relative z-10">Statut Opérationnel</h3>
                                
                                <label className="flex items-center gap-4 cursor-pointer group/toggle relative z-10 p-5 rounded-[2rem] bg-slate-50 border-2 border-transparent hover:border-blue-100 hover:bg-white transition-all">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            checked={data.is_available}
                                            onChange={e => setData('is_available', e.target.checked)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </div>
                                    <span className={`text-[11px] font-black uppercase tracking-widest ${data.is_available ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {data.is_available ? 'Disponible' : 'Indisponible'}
                                    </span>
                                </label>

                                <div className="mt-10 pt-10 border-t border-slate-100">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                                                {technician.bookings_count || 0}
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Missions</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                                <Star size={18} fill="currentColor" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score Expert</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
                            >
                                {processing ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Save size={24} className="text-blue-500" /> Mettre à jour</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
