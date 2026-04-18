import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Plus, Save, X, Wrench, Clock, 
    FileText, Tag, CheckCircle2, ChevronLeft 
} from 'lucide-react'

export default function ServicesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        duration_minutes: 60,
        is_active: true,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('admin.services.store'))
    }

    // Auto-generate slug from name
    const handleNameChange = (e) => {
        const name = e.target.value
        setData({
            ...data,
            name: name,
            slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        })
    }

    return (
        <AdminLayout title="Nouveau Service">
            <Head title="Admin — Ajouter un Service" />

            <div className="mb-10 flex items-center gap-4">
                <Link href={route('admin.services.index')} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <ChevronLeft size={20} />
                </Link>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Configuration Catalogue</div>
            </div>

            <form onSubmit={submit} className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 group">
                            <h3 className="text-xl font-black text-slate-900 mb-10 tracking-tight flex items-center gap-3">
                                <Plus size={24} className="text-blue-600" /> Informations Générales
                            </h3>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Nom du Service</label>
                                        <div className="relative group">
                                            <Wrench size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                                            <input 
                                                type="text" 
                                                value={data.name}
                                                onChange={handleNameChange}
                                                placeholder="Ex: Débouchage évier"
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl pl-12 py-4 text-sm font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                        {errors.name && <p className="text-rose-500 text-[10px] font-bold px-2 uppercase tracking-tight">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Identifiant (Slug)</label>
                                        <div className="relative">
                                            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input 
                                                type="text" 
                                                value={data.slug}
                                                onChange={e => setData('slug', e.target.value)}
                                                className="w-full bg-slate-50/50 border-slate-100 rounded-2xl pl-12 py-4 text-xs font-mono text-slate-400"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-2">Description Commerciale</label>
                                    <div className="relative">
                                        <FileText size={18} className="absolute left-4 top-5 text-slate-300" />
                                        <textarea 
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Expliquez ce que comprend l'intervention..."
                                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] pl-12 pr-6 py-5 text-sm font-medium text-slate-600 min-h-[160px] transition-all resize-none shadow-inner"
                                        ></textarea>
                                    </div>
                                    {errors.description && <p className="text-rose-500 text-[10px] font-bold px-2 uppercase tracking-tight">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-900/10 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                             <h3 className="text-lg font-black mb-8 flex items-center gap-3 pr-2">
                                <Clock size={22} className="text-blue-400" /> Paramètres d'Abonnement
                             </h3>
                             <div className="flex flex-col md:flex-row gap-10">
                                 <div className="flex-1 space-y-2">
                                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block px-2">Durée Estimée</label>
                                     <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                                         <input 
                                            type="range" min="15" max="240" step="15"
                                            value={data.duration_minutes}
                                            onChange={e => setData('duration_minutes', e.target.value)}
                                            className="flex-1 accent-blue-500"
                                         />
                                         <span className="text-xl font-black min-w-[80px] text-center">{data.duration_minutes}m</span>
                                     </div>
                                 </div>
                                 <div className="flex-1 space-y-2">
                                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block px-2">Statut Initial</label>
                                     <button 
                                        type="button"
                                        onClick={() => setData('is_active', !data.is_active)}
                                        className={`w-full py-4 rounded-2xl border transition-all font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3
                                            ${data.is_active ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                         {data.is_active ? <CheckCircle2 size={16} /> : <X size={16} />}
                                         {data.is_active ? 'Service Actif' : 'Désactivé'}
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Action Column */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl shadow-slate-200 sticky top-24">
                             <div className="p-6 bg-blue-50 rounded-2xl mb-8 flex flex-col items-center text-center">
                                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                                     <Wrench size={24} />
                                 </div>
                                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">Aperçu Public</h4>
                                 <p className="text-[10px] font-bold text-slate-400">Ce service sera visible immédiatement sur la page d'accueil.</p>
                             </div>
                             
                             <div className="space-y-3">
                                 <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100 disabled:opacity-50">
                                    {processing ? 'Ajout...' : 'Créer le Service'}
                                 </button>
                                 <Link href={route('admin.services.index')} 
                                    className="w-full py-4 bg-slate-50 text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center">
                                    <X size={14} className="mr-2" /> Annuler
                                 </Link>
                             </div>
                        </div>
                    </div>

                </div>
            </form>
        </AdminLayout>
    )
}
