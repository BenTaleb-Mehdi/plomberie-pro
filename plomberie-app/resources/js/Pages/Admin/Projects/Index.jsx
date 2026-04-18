import { useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import Pagination from '@/Components/Pagination'
import FormModal from '@/Components/FormModal'
import ConfirmationModal from '@/Components/ConfirmationModal'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import FileDropzone from '@/Components/FileDropzone'
import { 
    Image as ImageIcon, Plus, Trash2, 
    Edit2, Star, ChevronRight, Search, 
    LayoutGrid, Camera, Tag, Eye,
    Sparkles, CheckCircle2, MoreVertical,
    X, ImageIcon as PhotoIcon, ChevronLeft, ChevronRight as ChevronRightIcon,
    MapPin, Calendar
} from 'lucide-react'

export default function ProjectsIndex({ projects, categories }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isGalleryViewOpen, setIsGalleryViewOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

    // Separate form instances to avoid state/method bleeding
    const createForm = useForm({
        title: '',
        description: '',
        main_image: null,
        gallery: [],
        category: categories[0] || 'Plomberie Générale',
        city: '',
        intervention_date: '',
        is_featured: false,
    })

    const editForm = useForm({
        title: '',
        description: '',
        main_image: null,
        gallery: [],
        category: '',
        city: '',
        intervention_date: '',
        is_featured: false,
    })

    const openCreateModal = () => {
        createForm.reset()
        createForm.clearErrors()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (project) => {
        setSelectedProject(project)
        editForm.setData({
            title: project.title,
            description: project.description,
            main_image: project.main_image,
            gallery: project.gallery || [],
            category: project.category,
            city: project.city || '',
            intervention_date: project.intervention_date ? project.intervention_date.split('T')[0] : '',
            is_featured: project.is_featured,
        })
        editForm.clearErrors()
        setIsEditModalOpen(true)
    }

    const openGalleryView = (project) => {
        setSelectedProject(project)
        setCurrentGalleryIndex(0)
        setIsGalleryViewOpen(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        createForm.post(route('admin.projects.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false)
                createForm.reset()
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        
        if (!selectedProject) return

        editForm.transform((data) => ({
            ...data,
            _method: 'put',
        }))

        editForm.post(route('admin.projects.update', selectedProject.id), {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false)
                editForm.reset()
            }
        })
    }

    const handleDelete = () => {
        router.delete(route('admin.projects.destroy', selectedProject.id), {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    const toggleFeatured = (id) => {
        router.post(route('admin.projects.toggle-featured', id))
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const allImages = selectedProject ? [selectedProject.main_image, ...(selectedProject.gallery || [])] : []

    return (
        <AdminLayout title="Gallerie de Réalisations">
            <Head title="Admin — Portfolio" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="max-w-xl">
                    <p className="text-blue-600 font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                         <Sparkles size={14} /> Nos Dernières Interventions
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">Portfolio de Réalisations</h2>
                    <p className="text-slate-500 font-medium text-sm">Valorisez votre expertise en publiant vos plus belles interventions et leurs galeries photos.</p>
                </div>
                
                <button 
                    onClick={openCreateModal}
                    className="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={16} strokeWidth={2.5} /> Publier un Projet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
                {projects.data.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col">
                        <div className="aspect-[4/3] relative overflow-hidden m-2 rounded-lg">
                            <img src={project.main_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                            
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button onClick={() => toggleFeatured(project.id)} className={`p-2 rounded-lg shadow-sm transition-all backdrop-blur-md ${project.is_featured ? 'bg-amber-400 text-white' : 'bg-white/90 text-slate-400 hover:text-amber-500'}`}>
                                    <Star size={14} fill={project.is_featured ? "currentColor" : "none"} />
                                </button>
                            </div>

                            <button onClick={() => openGalleryView(project)} className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/50 text-blue-600 hover:scale-105 transition-all active:scale-95 flex items-center gap-1.5">
                                <ImageIcon size={14} />
                                <span className="text-[10px] font-bold">{(project.gallery?.length || 0) + 1}</span>
                            </button>

                            <div className="absolute bottom-3 left-3">
                                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold rounded-md shadow-sm text-slate-700 block">
                                    {project.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 pb-4 flex-1">
                            <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-slate-500">
                                {project.city && <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-500" /> {project.city}</span>}
                                {project.city && project.intervention_date && <span className="text-slate-300">•</span>}
                                {project.intervention_date && <span>{formatDate(project.intervention_date)}</span>}
                            </div>
                            <h3 className="text-[15px] font-bold text-slate-900 truncate tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                            <p className="text-[13px] font-medium text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="p-4 pt-0 bg-white flex gap-2">
                            <button onClick={() => openEditModal(project)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-all text-[11px] active:scale-[0.98]">
                                <Edit2 size={14} /> Modifier
                            </button>
                            <button onClick={() => { setSelectedProject(project); setIsDeleteModalOpen(true); }}
                                className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 shrink-0 rounded-lg">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 flex justify-center shadow-sm">
                <Pagination links={projects.links} />
            </div>

            {/* CREATE MODAL */}
            <FormModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Galerie Realisation"
                maxWidth="3xl"
                footer={
                    <button 
                        disabled={createForm.processing}
                        onClick={handleCreate}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {createForm.processing ? 'Chargement...' : 'Publier au Portfolio'}
                    </button>
                }
            >
                <div className="space-y-10 py-4 font-sans text-moyen h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Titre de l'Intervention" />
                            <TextInput 
                                value={createForm.data.title} 
                                onChange={e => createForm.setData('title', e.target.value)} 
                                placeholder="ex: Rénovation Salle de Bain Tanger" 
                            />
                            <InputError message={createForm.errors.title} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Catégorie d'expertise" />
                            <select 
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                value={createForm.data.category}
                                onChange={e => createForm.setData('category', e.target.value)}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Ville" />
                            <TextInput 
                                value={createForm.data.city} 
                                onChange={e => createForm.setData('city', e.target.value)} 
                                placeholder="ex: Tanger, Casablanca..." 
                            />
                            <InputError message={createForm.errors.city} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Date de l'Intervention" />
                            <input 
                                type="date"
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                value={createForm.data.intervention_date}
                                onChange={e => createForm.setData('intervention_date', e.target.value)}
                            />
                            <InputError message={createForm.errors.intervention_date} />
                        </div>
                    </div>

                    <FileDropzone 
                        label="Illustration Principale"
                        value={createForm.data.main_image}
                        onChange={(file) => createForm.setData('main_image', file)}
                    />
                    <InputError message={createForm.errors.main_image} />

                    <FileDropzone 
                        label="Galerie Photos Multi-clichés"
                        multiple={true}
                        placeholder="Glissez vos photos ici"
                        value={createForm.data.gallery}
                        onChange={(files) => createForm.setData('gallery', files)}
                    />
                    <InputError message={createForm.errors.gallery} />

                    <div className="space-y-4">
                        <InputLabel value="Description détaillé" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[140px]"
                            value={createForm.data.description}
                            onChange={e => createForm.setData('description', e.target.value)}
                        />
                        <InputError message={createForm.errors.description} />
                    </div>

                    <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                        <input 
                            type="checkbox" 
                            id="is_featured_create"
                            checked={createForm.data.is_featured} 
                            onChange={e => createForm.setData('is_featured', e.target.checked)}
                            className="w-6 h-6 text-amber-500 bg-white border-slate-200 rounded-xl focus:ring-amber-500 transition-all cursor-pointer"
                        />
                        <label htmlFor="is_featured_create" className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] cursor-pointer">En vedette sur la page de garde</label>
                    </div>
                </div>
            </FormModal>

            {/* EDIT MODAL */}
            <FormModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Configuration Realisation"
                maxWidth="3xl"
                footer={
                    <button 
                        disabled={editForm.processing}
                        onClick={handleEdit}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {editForm.processing ? 'Mise à jour...' : 'Sauvegarder les changements'}
                    </button>
                }
            >
                <div className="space-y-10 py-4 font-sans text-moyen h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Titre" />
                            <TextInput value={editForm.data.title} onChange={e => editForm.setData('title', e.target.value)} />
                            <InputError message={editForm.errors.title} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Catégorie" />
                            <select 
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                value={editForm.data.category}
                                onChange={e => editForm.setData('category', e.target.value)}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Ville" />
                            <TextInput value={editForm.data.city} onChange={e => editForm.setData('city', e.target.value)} />
                            <InputError message={editForm.errors.city} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Date de l'Intervention" />
                            <input 
                                type="date"
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                value={editForm.data.intervention_date}
                                onChange={e => editForm.setData('intervention_date', e.target.value)}
                            />
                            <InputError message={editForm.errors.intervention_date} />
                        </div>
                    </div>

                    <FileDropzone 
                        label="Modifier l'Image Principale"
                        value={editForm.data.main_image}
                        onChange={(file) => editForm.setData('main_image', file)}
                    />
                    <InputError message={editForm.errors.main_image} />

                    <FileDropzone 
                        label="Galerie Photos (Remplace l'existante)"
                        multiple={true}
                        value={editForm.data.gallery}
                        onChange={(files) => editForm.setData('gallery', files)}
                    />
                    <InputError message={editForm.errors.gallery} />

                    <div className="space-y-4">
                        <InputLabel value="Description" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[140px]"
                            value={editForm.data.description}
                            onChange={e => editForm.setData('description', e.target.value)}
                        />
                        <InputError message={editForm.errors.description} />
                    </div>

                    <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                        <input 
                            type="checkbox" 
                            id="is_featured_edit"
                            checked={editForm.data.is_featured} 
                            onChange={e => editForm.setData('is_featured', e.target.checked)}
                            className="w-6 h-6 text-amber-500 bg-white border-slate-200 rounded-xl focus:ring-amber-500 transition-all cursor-pointer"
                        />
                        <label htmlFor="is_featured_edit" className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] cursor-pointer">En vedette sur le site</label>
                    </div>
                </div>
            </FormModal>

            {/* GALLERY VIEWER remains same */}
            {isGalleryViewOpen && selectedProject && (
                <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-10 animate-in fade-in duration-500">
                    <button onClick={() => setIsGalleryViewOpen(false)} className="absolute top-10 right-10 w-16 h-16 bg-white/10 text-white rounded-[2rem] flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                        <X size={24} />
                    </button>

                    <div className="w-full max-w-5xl aspect-video relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                        <img src={allImages[currentGalleryIndex]} className="w-full h-full object-contain bg-slate-900/50" />
                        
                        {allImages.length > 1 && (
                            <>
                                <button 
                                    onClick={() => setCurrentGalleryIndex((currentGalleryIndex - 1 + allImages.length) % allImages.length)}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button 
                                    onClick={() => setCurrentGalleryIndex((currentGalleryIndex + 1) % allImages.length)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRightIcon size={24} />
                                </button>
                            </>
                        )}

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex gap-4">
                            {allImages.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentGalleryIndex ? 'bg-blue-400 scale-125' : 'bg-white/20'}`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-2">{selectedProject.title}</h2>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{selectedProject.category} — {currentGalleryIndex + 1} / {allImages.length}</p>
                    </div>
                </div>
            )}

            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Supprimer cette réalisation ?"
                message={`Cette action est définitive. Toute la galerie de '${selectedProject?.title}' sera effacée.`}
            />

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
            `}} />
        </AdminLayout>
    )
}
