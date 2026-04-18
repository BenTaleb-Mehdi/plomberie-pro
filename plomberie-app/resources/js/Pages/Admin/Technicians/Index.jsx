import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import Pagination from '@/Components/Pagination'
import FormModal from '@/Components/FormModal'
import ConfirmationModal from '@/Components/ConfirmationModal'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import { 
    Wrench, Star, Phone, Mail, MapPin, 
    Calendar, CheckCircle2, ChevronRight, MoreVertical,
    Plus, User, Shield, Info, Edit2, Trash2, Map, Search
} from 'lucide-react'

export default function TechniciansIndex({ technicians }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedTech, setSelectedTech] = useState(null)

    const form = useForm({
        name: '',
        email: '',
        password: '',
        specialty: '',
        zone: 'Tanger Centre',
        bio: '',
        is_available: true,
    })

    const openCreateModal = () => {
        form.reset()
        form.clearErrors()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (tech) => {
        setSelectedTech(tech)
        form.setData({
            name: tech.user?.name || '',
            email: tech.user?.email || '',
            password: '',
            specialty: tech.specialty || '',
            zone: tech.zone || 'Tanger Centre',
            bio: tech.bio || '',
            is_available: tech.is_available,
        })
        form.clearErrors()
        setIsEditModalOpen(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        form.post(route('admin.technicians.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false)
                form.reset()
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        form.put(route('admin.technicians.update', selectedTech.id), {
            onSuccess: () => {
                setIsEditModalOpen(false)
                form.reset()
            }
        })
    }

    const handleDelete = () => {
        form.delete(route('admin.technicians.destroy', selectedTech.id), {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <AdminLayout title="Techniciens">
            <Head title="Admin — Techniciens" />

            {/* Top Bar with Search and Action */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group w-full max-w-2xl">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="text" placeholder="Rechercher par nom, spécialité, zone..." 
                            className="w-full bg-transparent border-transparent focus:ring-0 rounded-xl pl-12 py-2 text-[13px] font-medium transition-all placeholder:text-slate-400" />
                    </div>
                </div>
                
                <button 
                    onClick={openCreateModal}
                    className="w-full lg:w-auto px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={16} strokeWidth={2.5} /> Recruter Technicien
                </button>
            </div>

            {/* Grid of Technicians */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 font-sans">
                {technicians.data.map((tech) => (
                    <div key={tech.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        
                        <div className="p-6 relative z-10 flex-1">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all uppercase leading-none">
                                    {tech.user?.name?.[0] || 'T'}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill="currentColor" />)}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border flex items-center gap-1 ${tech.is_available ? 'text-emerald-600 bg-emerald-50 border-emerald-100/50' : 'text-slate-500 bg-slate-50 border-slate-200'}`}>
                                        {tech.is_available ? 'Disponible' : 'Occupé'}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight truncate group-hover:text-blue-600 transition-colors">{tech.user?.name}</h3>
                            <p className="text-[11px] font-medium text-blue-600 mb-6 flex items-center gap-1.5">
                                <Wrench size={12} /> {tech.specialty || 'Plombier Expert'}
                            </p>

                            <div className="space-y-3 mb-4 mt-auto">
                                <div className="flex items-center gap-3 text-slate-600 text-[13px] font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                                    <div className="w-6 h-6 rounded-md shadow-sm flex items-center justify-center text-slate-400 bg-white"><Phone size={12} /></div>
                                    {tech.user?.phone || 'N/A'}
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 text-[13px] font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all overflow-hidden">
                                    <div className="w-6 h-6 rounded-md shadow-sm flex items-center justify-center text-slate-400 bg-white"><MapPin size={12} /></div>
                                    <span className="truncate">{tech.zone || 'Tanger Centre'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white border-t border-slate-100 flex gap-2 relative z-10">
                            <button onClick={() => openEditModal(tech)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-all text-xs active:scale-[0.98]">
                                <Edit2 size={14} /> Modifier
                            </button>
                            <button onClick={() => { setSelectedTech(tech); setIsDeleteModalOpen(true); }}
                                className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-[0.98] rounded-lg shrink-0">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 flex justify-center shadow-sm">
                <Pagination links={technicians.links} />
            </div>

            {/* CREATE MODAL */}
            <FormModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Recrutement Technicien"
                maxWidth="4xl"
                footer={
                    <button 
                        disabled={form.processing}
                        onClick={handleCreate}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {form.processing ? 'Chargement...' : 'Valider le Recrutement'}
                    </button>
                }
            >
                <div className="space-y-12 py-4 font-sans text-moyen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                                <User size={14} /> Profil de Base
                            </h4>
                            <div className="space-y-4">
                                <InputLabel value="Nom Complet" />
                                <TextInput value={form.data.name} onChange={e => form.setData('name', e.target.value)} placeholder="ex: Omar Charaï" />
                                <InputError message={form.errors.name} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Email Professionnel" />
                                <TextInput type="email" value={form.data.email} onChange={e => form.setData('email', e.target.value)} placeholder="omar@proplomberie.com" />
                                <InputError message={form.errors.email} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Mot de passe temporaire" />
                                <TextInput type="password" value={form.data.password} onChange={e => form.setData('password', e.target.value)} placeholder="••••••••" />
                                <InputError message={form.errors.password} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                <Shield size={14} /> Paramètres Techniques
                            </h4>
                            <div className="space-y-4">
                                <InputLabel value="Spécialité Principale" />
                                <TextInput value={form.data.specialty} onChange={e => form.setData('specialty', e.target.value)} placeholder="ex: Installation Sanitaire" />
                                <InputError message={form.errors.specialty} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Zone d'Intervention" />
                                <select 
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                    value={form.data.zone}
                                    onChange={e => form.setData('zone', e.target.value)}
                                >
                                    <option value="Tanger Centre">Tanger Centre</option>
                                    <option value="Tanger Médina">Tanger Médina</option>
                                    <option value="Gzenaya">Gzenaya</option>
                                    <option value="Malabata">Malabata</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                <input 
                                    type="checkbox" 
                                    id="is_available_create"
                                    checked={form.data.is_available} 
                                    onChange={e => form.setData('is_available', e.target.checked)}
                                    className="w-5 h-5 text-blue-600 bg-white border-slate-200 rounded-lg focus:ring-blue-500"
                                />
                                <label htmlFor="is_available_create" className="text-sm font-black text-slate-900 uppercase tracking-widest cursor-pointer">Actif immédiatement</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Courte Biographie / Notes" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[120px]"
                            value={form.data.bio}
                            onChange={e => form.setData('bio', e.target.value)}
                            placeholder="Décrivez brièvement l'expérience du technicien..."
                        />
                    </div>
                </div>
            </FormModal>

            {/* EDIT MODAL */}
            <FormModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Dossier Technique"
                maxWidth="4xl"
                footer={
                    <button 
                        disabled={form.processing}
                        onClick={handleEdit}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {form.processing ? 'Mise à jour...' : 'Sauvegarder Technicalité'}
                    </button>
                }
            >
                <div className="space-y-12 py-4 font-sans text-moyen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                                <User size={14} /> Profil Pro
                            </h4>
                            <div className="space-y-4">
                                <InputLabel value="Nom Complet" />
                                <TextInput value={form.data.name} onChange={e => form.setData('name', e.target.value)} />
                                <InputError message={form.errors.name} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Email" />
                                <TextInput value={form.data.email} onChange={e => form.setData('email', e.target.value)} />
                                <InputError message={form.errors.email} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Mot de Passe (Laisser vide pour garder l'actuel)" />
                                <TextInput type="password" value={form.data.password} onChange={e => form.setData('password', e.target.value)} placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                <Shield size={14} /> Détails Techniques
                            </h4>
                            <div className="space-y-4">
                                <InputLabel value="Spécialité" />
                                <TextInput value={form.data.specialty} onChange={e => form.setData('specialty', e.target.value)} />
                                <InputError message={form.errors.specialty} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Zone d'Intervention" />
                                <select 
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                    value={form.data.zone}
                                    onChange={e => form.setData('zone', e.target.value)}
                                >
                                    <option value="Tanger Centre">Tanger Centre</option>
                                    <option value="Tanger Médina">Tanger Médina</option>
                                    <option value="Gzenaya">Gzenaya</option>
                                    <option value="Malabata">Malabata</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                <input 
                                    type="checkbox" 
                                    id="is_available_edit"
                                    checked={form.data.is_available} 
                                    onChange={e => form.setData('is_available', e.target.checked)}
                                    className="w-5 h-5 text-blue-600 bg-white border-slate-200 rounded-lg focus:ring-blue-500"
                                />
                                <label htmlFor="is_available_edit" className="text-sm font-black text-slate-900 uppercase tracking-widest cursor-pointer">Disponible pour Missions</label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Bio / Expérience" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[120px]"
                            value={form.data.bio}
                            onChange={e => form.setData('bio', e.target.value)}
                        />
                    </div>
                </div>
            </FormModal>

            {/* DELETE MODAL */}
            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Supprimer ce Technicien ?"
                message={`Cette action supprimera ${selectedTech?.user?.name} et son compte associé de la plateforme.`}
                confirmText="Supprimer Définitivement"
            />
        </AdminLayout>
    )
}
