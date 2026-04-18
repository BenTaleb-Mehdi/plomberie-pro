import { Head, useForm, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Image as ImageIcon, Plus, ArrowLeft, 
    Save, LayoutGrid, FileText, CheckCircle2,
    Star, Type, Hash, Trash2
} from 'lucide-react'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import { router } from '@inertiajs/react'

export default function Edit({ project }) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        main_image: project.main_image || '',
        category: project.category || '',
        is_featured: !!project.is_featured,
        gallery: project.gallery || [],
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.projects.update', project.id))
    }

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            router.delete(route('admin.projects.destroy', project.id))
        }
    }

    const categories = [
        'Plomberie Résidentielle',
        'Installation Sanitaire',
        'Réparation d\'Urgence',
        'Chauffage & Eau Chaude',
        'Projets Industriels',
        'Rénovation Cuisine/SDB'
    ]

    return (
        <AdminLayout title={`Modifier: ${project.title}`}>
            <Head title={`Admin — Modifier ${project.title}`} />

            <div className="flex items-center justify-between mb-10">
                <Link href={route('admin.projects.index')} className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour au portfolio
                </Link>
                
                <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-rose-500 font-black uppercase tracking-widest text-[10px] bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
                >
                    <Trash2 size={14} /> Supprimer du portfolio
                </button>
            </div>

            <div className="max-w-5xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <SpotlightCard className="rounded-[3rem] bg-white border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 md:p-12 relative group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                                
                                <h2 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3 relative z-10">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                        <Type size={20} />
                                    </div>
                                    Détails du Projet
                                </h2>

                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Titre de la Réalisation</label>
                                        <input 
                                            type="text" 
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-800 font-bold text-xl transition-all outline-none"
                                        />
                                        {errors.title && <p className="mt-2 text-xs font-bold text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Catégorie</label>
                                            <select 
                                                value={data.category}
                                                onChange={e => setData('category', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none appearance-none"
                                            >
                                                <option value="">Sélectionner</option>
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                            {errors.category && <p className="mt-2 text-xs font-bold text-red-500">{errors.category}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Image Principale (URL)</label>
                                            <input 
                                                type="text" 
                                                value={data.main_image}
                                                onChange={e => setData('main_image', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-bold transition-all outline-none"
                                            />
                                            {errors.main_image && <p className="mt-2 text-xs font-bold text-red-500">{errors.main_image}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1 flex items-center gap-2">
                                            <FileText size={12} className="text-blue-600" /> Description du Projet
                                        </label>
                                        <textarea 
                                            rows="6"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-700 font-medium transition-all outline-none resize-none"
                                        ></textarea>
                                        {errors.description && <p className="mt-2 text-xs font-bold text-red-500">{errors.description}</p>}
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                             <h3 className="text-lg font-black mb-8 relative z-10 flex items-center gap-2">
                                <Star size={20} className="text-amber-500" /> Publication
                             </h3>
                             
                             <label className="flex items-center gap-4 cursor-pointer group/toggle relative z-10 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors mb-10">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        checked={data.is_featured}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest">Mettre en avant</span>
                            </label>

                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                Les projets mis en avant apparaissent en priorité sur la page d'accueil de la plateforme.
                            </p>
                        </div>

                        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
                            <div className="aspect-video bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 overflow-hidden">
                                {data.main_image ? (
                                    <img src={data.main_image} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <>
                                        <ImageIcon size={40} className="mb-2" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Aperçu Image</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
                        >
                            {processing ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <><Save size={24} /> Enregistrer Changes</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
