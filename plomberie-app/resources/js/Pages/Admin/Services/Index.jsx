import { useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import Pagination from '@/Components/Pagination'
import FormModal from '@/Components/FormModal'
import ConfirmationModal from '@/Components/ConfirmationModal'
import FileDropzone from '@/Components/FileDropzone'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import { 
    Settings, Plus, Edit2, Trash2, 
    Clock, Tag, Eye, ToggleLeft, ToggleRight,
    Wrench, CheckCircle2, ChevronRight, Info,
    FileText, Zap
} from 'lucide-react'

export default function ServicesIndex({ services }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    const form = useForm({
        name: '',
        slug: '',
        description: '',
        duration_minutes: 60,
        is_active: true,
        image: null,
    })

    const openCreateModal = () => {
        form.reset()
        form.clearErrors()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (service) => {
        setSelectedService(service)
        form.setData({
            name: service.name,
            slug: service.slug,
            description: service.description,
            duration_minutes: service.duration_minutes,
            is_active: service.is_active,
            image: null,
        })
        form.clearErrors()
        setIsEditModalOpen(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        form.post(route('admin.services.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false)
                form.reset()
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        form.transform((data) => ({
            ...data,
            _method: 'put',
        })).post(route('admin.services.update', selectedService.id), {
            onSuccess: () => {
                setIsEditModalOpen(false)
                form.reset()
            }
        })
    }

    const handleDelete = () => {
        router.delete(route('admin.services.destroy', selectedService.id), {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    const toggleStatus = (id) => {
        router.post(route('admin.services.toggle', id))
    }

    return (
        <AdminLayout title="Catalogue des Services">
            <Head title="Admin — Catalogue" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="max-w-xl">
                    <p className="text-blue-600 font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                        <Zap size={14} /> Optimisation Catalogue
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">Gestion de l'Offre</h2>
                    <p className="text-slate-500 font-medium text-sm">Centralisez vos expertises, durées d'intervention et visibilité publique.</p>
                </div>
                <button 
                    onClick={openCreateModal}
                    className="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={16} strokeWidth={2.5} /> Nouveau Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 font-sans">
                {services.data.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        
                        {service.image_url ? (
                            <div className="h-32 w-full relative overflow-hidden rounded-t-xl shrink-0">
                                <img src={service.image_url} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
                            </div>
                        ) : null}

                        <div className="p-6 relative z-10 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                    <Wrench size={20} />
                                </div>
                                <button onClick={() => toggleStatus(service.id)} className="transition-transform active:scale-[0.98]">
                                    {service.is_active ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-[10px] uppercase tracking-wider border border-emerald-100/50">
                                            <CheckCircle2 size={12} /> Actif
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg font-bold text-[10px] uppercase tracking-wider border border-slate-200">
                                            <ToggleLeft size={12} /> Inactif
                                        </div>
                                    )}
                                </button>
                            </div>

                            <h3 className="text-[17px] font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">{service.name}</h3>
                            <p className="text-[13px] font-medium text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-600 border border-slate-200">
                                    <Clock size={12} className="text-blue-500" /> {service.duration_minutes}m Pro
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-600 border border-slate-200">
                                    <Zap size={12} className="text-amber-500" /> Devis Gratuit
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white border-t border-slate-100 flex gap-2 relative z-10">
                            <button onClick={() => openEditModal(service)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-all text-xs active:scale-[0.98]">
                                <Edit2 size={14} /> Configurer
                            </button>
                            <button onClick={() => { setSelectedService(service); setIsDeleteModalOpen(true); }}
                                className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-[0.98] rounded-lg shrink-0">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 flex justify-center shadow-sm">
                <Pagination links={services.links} />
            </div>

            {/* CREATE MODAL */}
            <FormModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Ajouter au Catalogue"
                maxWidth="2xl"
                footer={
                    <button 
                        disabled={form.processing}
                        onClick={handleCreate}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {form.processing ? 'Chargement...' : 'Déployer le Service'}
                    </button>
                }
            >
                <div className="space-y-8 py-4 font-sans text-moyen">
                    <div className="space-y-4">
                        <InputLabel value="Nom du Service" />
                        <TextInput 
                            value={form.data.name} 
                            onChange={e => form.setData('name', e.target.value)} 
                            placeholder="ex: Réparation Fuite Encastrée" 
                            className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Identifiant URL (Slug - Optionnel)" />
                            <TextInput 
                                value={form.data.slug} 
                                onChange={e => form.setData('slug', e.target.value)} 
                                placeholder="fuite-encastree"
                                className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                            />
                            <InputError message={form.errors.slug} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Durée Estimée (Min)" />
                            <TextInput 
                                type="number"
                                value={form.data.duration_minutes} 
                                onChange={e => form.setData('duration_minutes', e.target.value)} 
                                className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                            />
                            <InputError message={form.errors.duration_minutes} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Description Public" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[140px]"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                            placeholder="Décrivez l'intervention, le matériel inclus, etc."
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Image d'illustration (Optionnel)" />
                        {form.data.image && (
                            <div className="mb-4 h-32 rounded-xl overflow-hidden border border-slate-200 relative group">
                                <img src={URL.createObjectURL(form.data.image)} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <FileDropzone 
                            onFileSelect={(file) => form.setData('image', file)}
                            value={form.data.image}
                            error={form.errors.image}
                        />
                        <InputError message={form.errors.image} />
                    </div>

                    <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                        <input 
                            type="checkbox" 
                            id="is_active_create"
                            checked={form.data.is_active} 
                            onChange={e => form.setData('is_active', e.target.checked)}
                            className="w-6 h-6 text-blue-600 bg-white border-slate-200 rounded-xl focus:ring-blue-500 transition-all cursor-pointer"
                        />
                        <label htmlFor="is_active_create" className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] cursor-pointer">Service Actif & Visible</label>
                    </div>
                </div>
            </FormModal>

            {/* EDIT MODAL */}
            <FormModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Configuration Service"
                maxWidth="2xl"
                footer={
                    <button 
                        disabled={form.processing}
                        onClick={handleEdit}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {form.processing ? 'Mise à jour...' : 'Sauvegarder Configuration'}
                    </button>
                }
            >
                <div className="space-y-8 py-4 font-sans text-moyen">
                    <div className="space-y-4">
                        <InputLabel value="Nom de l'expertise" />
                        <TextInput 
                            value={form.data.name} 
                            onChange={e => form.setData('name', e.target.value)} 
                            className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                        />
                        <InputError message={form.errors.name} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <InputLabel value="Slug Unique" />
                            <TextInput 
                                value={form.data.slug} 
                                onChange={e => form.setData('slug', e.target.value)} 
                                className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                            />
                            <InputError message={form.errors.slug} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Durée (Min)" />
                            <TextInput 
                                type="number"
                                value={form.data.duration_minutes} 
                                onChange={e => form.setData('duration_minutes', e.target.value)} 
                                className="bg-slate-50 border-transparent focus:bg-white focus:ring-8 focus:ring-blue-100 rounded-2xl p-6 text-sm font-black transition-all"
                            />
                            <InputError message={form.errors.duration_minutes} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Description" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[140px]"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                        />
                        <InputError message={form.errors.description} />
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Image d'illustration (Télécharger pour remplacer)" />
                        {form.data.image ? (
                            <div className="mb-4 h-32 rounded-xl overflow-hidden border border-slate-200 relative group">
                                <img src={URL.createObjectURL(form.data.image)} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ) : selectedService?.image_url && !form.data.image && (
                            <div className="mb-4 h-32 rounded-xl overflow-hidden border border-slate-200">
                                <img src={selectedService.image_url} alt="Current" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <FileDropzone 
                            onFileSelect={(file) => form.setData('image', file)}
                            value={form.data.image}
                            error={form.errors.image}
                        />
                        <InputError message={form.errors.image} />
                    </div>

                    <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                        <input 
                            type="checkbox" 
                            id="is_active_edit"
                            checked={form.data.is_active} 
                            onChange={e => form.setData('is_active', e.target.checked)}
                            className="w-6 h-6 text-blue-600 bg-white border-slate-200 rounded-xl focus:ring-blue-500 transition-all cursor-pointer"
                        />
                        <label htmlFor="is_active_edit" className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] cursor-pointer">Maintenir l'activité de ce service</label>
                    </div>
                </div>
            </FormModal>

            {/* DELETE MODAL */}
            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Retirer ce Service ?"
                message={`Voulez-vous vraiment supprimer '${selectedService?.name}' du catalogue ? Cette action est définitive.`}
                confirmText="Oui, Supprimer"
            />
        </AdminLayout>
    )
}
