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
    Users, User, Phone, Mail, MapPin, 
    Calendar, FileText, ChevronRight, Search, 
    MessageSquare, Award, Plus, Edit2, Trash2
} from 'lucide-react'

export default function ClientsIndex({ clients }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)

    // Form for Create/Edit
    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
    })

    const openCreateModal = () => {
        reset()
        clearErrors()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (client) => {
        setSelectedClient(client)
        setData({
            name: client.name,
            email: client.email,
            phone: client.phone || '',
        })
        clearErrors()
        setIsEditModalOpen(true)
    }

    const openDeleteModal = (client) => {
        setSelectedClient(client)
        setIsDeleteModalOpen(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        post(route('admin.clients.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false)
                reset()
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        put(route('admin.clients.update', selectedClient.id), {
            onSuccess: () => {
                setIsEditModalOpen(false)
                reset()
            }
        })
    }

    const handleDelete = () => {
        destroy(route('admin.clients.destroy', selectedClient.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false)
                setSelectedClient(null)
            }
        })
    }

    return (
        <AdminLayout title="Gestion des Clients">
            <Head title="Admin — Clients" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group w-full md:max-w-xl">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="text" placeholder="Rechercher un client..." 
                            className="w-full bg-transparent border-transparent focus:ring-0 rounded-xl pl-12 py-2 text-[13px] font-medium transition-all placeholder:text-slate-400" />
                    </div>
                </div>
                
                <button 
                    onClick={openCreateModal}
                    className="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={16} strokeWidth={2.5} /> Nouveau Client
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {clients.data.map((client) => (
                    <div key={client.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-start gap-5 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
                        
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all border border-slate-100 group-hover:border-blue-600 relative z-10 uppercase">
                            {client.name[0]}
                        </div>

                        <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="text-lg font-bold text-slate-900 truncate tracking-tight">{client.name}</h3>
                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEditModal(client)} className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-200">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => openDeleteModal(client)} className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-all border border-slate-200">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-5">
                                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500" /> Client Actif</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="flex items-center gap-1.5 text-slate-700"><FileText size={12} /> {client.bookings_count} Missions</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <Phone size={14} className="text-blue-500" />
                                    {client.phone || 'N/A'}
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 overflow-hidden">
                                    <Mail size={14} className="text-blue-500" />
                                    <span className="truncate">{client.email}</span>
                                </div>
                            </div>

                            <Link href={route('admin.clients.show', client.id)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 group-hover:underline underline-offset-4 transition-all">
                                Consulter Historique <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <Pagination links={clients.links} />
            </div>

            {/* CREATE MODAL */}
            <FormModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Ajouter un Nouveau Client"
                footer={
                    <button 
                        disabled={processing}
                        onClick={handleCreate}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {processing ? 'Création...' : 'Créer le Profil Client'}
                    </button>
                }
            >
                <form className="space-y-8 py-2">
                    <div className="space-y-4">
                        <InputLabel value="Nom Complet du Client" className="px-1" />
                        <TextInput 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)}
                            placeholder="ex: Ahmed Mansouri"
                            className={errors.name ? 'border-rose-500' : ''}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <InputLabel value="Adresse Email" className="px-1" />
                            <TextInput 
                                type="email"
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                                placeholder="ahmed@example.com"
                                className={errors.email ? 'border-rose-500' : ''}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="N° de Téléphone" className="px-1" />
                            <TextInput 
                                value={data.phone} 
                                onChange={e => setData('phone', e.target.value)}
                                placeholder="+212 6..."
                                className={errors.phone ? 'border-rose-500' : ''}
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>
                </form>
            </FormModal>

            {/* EDIT MODAL */}
            <FormModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Modifier le Client"
                footer={
                    <button 
                        disabled={processing}
                        onClick={handleEdit}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {processing ? 'Enregistrement...' : 'Mettre à Jour'}
                    </button>
                }
            >
                <form className="space-y-8 py-2">
                    <div className="space-y-4">
                        <InputLabel value="Nom Complet du Client" className="px-1" />
                        <TextInput 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)}
                            placeholder="ex: Ahmed Mansouri"
                            className={errors.name ? 'border-rose-500' : ''}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <InputLabel value="Adresse Email" className="px-1" />
                            <TextInput 
                                type="email"
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                                placeholder="ahmed@example.com"
                                className={errors.email ? 'border-rose-500' : ''}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="N° de Téléphone" className="px-1" />
                            <TextInput 
                                value={data.phone} 
                                onChange={e => setData('phone', e.target.value)}
                                placeholder="+212 6..."
                                className={errors.phone ? 'border-rose-500' : ''}
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>
                </form>
            </FormModal>

            {/* DELETE MODAL */}
            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                processing={processing}
                title="Supprimer ce Client ?"
                message={`Vous êtes sur le point de supprimer le client ${selectedClient?.name}. Toutes les réservations associées seront conservées mais l'accès au profil sera perdu.`}
                confirmText="Oui, Supprimer"
            />
        </AdminLayout>
    )
}
