import { useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { StatusBadge } from '@/Components/StatusBadge'
import Pagination from '@/Components/Pagination'
import FormModal from '@/Components/FormModal'
import ConfirmationModal from '@/Components/ConfirmationModal'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import { 
    Search, Filter, MoreHorizontal, Calendar, 
    User, MapPin, Eye, Edit, Trash2, CheckCircle, 
    XCircle, Plus, Clock, Settings, Map
} from 'lucide-react'

export default function BookingsIndex({ bookings, statuses, serviceTypes, technicians, filters, stats }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    // Form for Create
    const createForm = useForm({
        client_name: '',
        client_phone: '',
        client_email: '',
        city: 'Tanger',
        booking_date: '',
        booking_time: '',
        service_type_id: '',
        technician_id: '',
        notes: '',
    })

    // Form for Edit
    const editForm = useForm({
        client_name: '',
        client_phone: '',
        booking_date: '',
        booking_time: '',
        service_type_id: '',
        status: '',
        technician_id: '',
        admin_notes: '',
    })

    const openCreateModal = () => {
        createForm.reset()
        createForm.clearErrors()
        setIsCreateModalOpen(true)
    }

    const openEditModal = (booking) => {
        setSelectedBooking(booking)
        editForm.setData({
            client_name: booking.client_name,
            client_phone: booking.client_phone,
            booking_date: booking.booking_date,
            booking_time: booking.booking_time,
            service_type_id: booking.service_type_id,
            status: booking.status,
            technician_id: booking.technician_id || '',
            admin_notes: booking.admin_notes || '',
        })
        editForm.clearErrors()
        setIsEditModalOpen(true)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        createForm.post(route('admin.bookings.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false)
                createForm.reset()
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        editForm.put(route('admin.bookings.update', selectedBooking.id), {
            onSuccess: () => {
                setIsEditModalOpen(false)
                editForm.reset()
            }
        })
    }

    const handleDelete = () => {
        router.delete(route('admin.bookings.destroy', selectedBooking.id), {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <AdminLayout title="Réservations">
            <Head title="Admin — Réservations" />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                    { label: 'Total', value: stats.total, color: 'text-blue-600', icon: Calendar },
                    { label: 'En attente', value: stats.pending, color: 'text-amber-500', icon: Clock },
                    { label: 'Aujourd\'hui', value: stats.today, color: 'text-emerald-500', icon: CheckCircle },
                    { label: 'Terminées', value: stats.completed, color: 'text-slate-400', icon: XCircle },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                        </div>
                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform border border-slate-100`}>
                            <stat.icon size={18} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto flex-1">
                    <div className="relative flex-1 md:w-96 group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="text" placeholder="Référence, client, téléphone..." 
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-10 pr-4 py-2 text-[13px] font-medium transition-all placeholder:text-slate-400" />
                    </div>
                    <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-200">
                        <Filter size={16} />
                    </button>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={openCreateModal} className="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <Plus size={16} strokeWidth={2.5} /> Créer Réservation
                    </button>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50">
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">ID / Date</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Client</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Service & Staff</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">État</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.data.map((booking) => (
                                <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-slate-900 text-[13px]">#{booking.confirmation_code}</span>
                                            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                                                <Calendar size={12} className="text-blue-500" /> {booking.booking_date}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3 text-moyen">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center font-bold text-[11px] uppercase">
                                                {booking.client_name?.[0]}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[13px] font-bold text-slate-900 truncate tracking-tight">{booking.client_name}</span>
                                                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                                                    <MapPin size={10} /> {booking.city}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[13px] font-bold text-slate-700">{booking.service_type?.name}</span>
                                            {booking.technician ? (
                                                <span className="text-[11px] font-medium text-blue-600 flex items-center gap-1">
                                                    <User size={10} /> {booking.technician.user?.name}
                                                </span>
                                            ) : (
                                                <span className="text-[11px] font-medium text-amber-500 italic flex items-center gap-1">
                                                    Non assigné
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEditModal(booking)}
                                                className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all">
                                                <Edit size={14} />
                                            </button>
                                            <button onClick={() => { setSelectedBooking(booking); setIsDeleteModalOpen(true); }}
                                                className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all">
                                                <Trash2 size={14} />
                                            </button>
                                            <Link href={route('admin.bookings.show', booking.id)} 
                                                className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-200 transition-all">
                                                <Eye size={14} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
                    <Pagination links={bookings.links} />
                </div>
            </div>

            {/* CREATE MODAL */}
            <FormModal
                show={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Manuel Réservation"
                maxWidth="3xl"
                footer={
                    <button 
                        disabled={createForm.processing}
                        onClick={handleCreate}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {createForm.processing ? 'Création...' : 'Finaliser Réservation'}
                    </button>
                }
            >
                <div className="space-y-10 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Client Info */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Informations Client</h4>
                            <div className="space-y-4">
                                <InputLabel value="Nom du Client" />
                                <TextInput value={createForm.data.client_name} onChange={e => createForm.setData('client_name', e.target.value)} />
                                <InputError message={createForm.errors.client_name} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Téléphone" />
                                <TextInput value={createForm.data.client_phone} onChange={e => createForm.setData('client_phone', e.target.value)} />
                                <InputError message={createForm.errors.client_phone} />
                            </div>
                        </div>

                        {/* Schedule Info */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Détails Intervention</h4>
                            <div className="space-y-4">
                                <InputLabel value="Service Demandé" />
                                <select 
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                    value={createForm.data.service_type_id}
                                    onChange={e => createForm.setData('service_type_id', e.target.value)}
                                >
                                    <option value="">Sélectionner un service</option>
                                    {serviceTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                                <InputError message={createForm.errors.service_type_id} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <InputLabel value="Date" />
                                    <TextInput type="date" value={createForm.data.booking_date} onChange={e => createForm.setData('booking_date', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <InputLabel value="Heure" />
                                    <select 
                                        className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                        value={createForm.data.booking_time}
                                        onChange={e => createForm.setData('booking_time', e.target.value)}
                                    >
                                        <option value="">Heure</option>
                                        <option value="08:00">08:00</option><option value="10:00">10:00</option><option value="14:00">14:00</option><option value="16:00">16:00</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputLabel value="Assigner un Technicien (Optionnel)" />
                        <select 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                            value={createForm.data.technician_id}
                            onChange={e => createForm.setData('technician_id', e.target.value)}
                        >
                            <option value="">Automatic / Pending</option>
                            {technicians.map(t => <option key={t.id} value={t.id}>{t.user?.name} ({t.zone})</option>)}
                        </select>
                    </div>
                </div>
            </FormModal>

            {/* EDIT MODAL */}
            <FormModal
                show={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Modifier Réservation"
                maxWidth="3xl"
                footer={
                    <button 
                        disabled={editForm.processing}
                        onClick={handleEdit}
                        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {editForm.processing ? 'Enregistrement...' : 'Mettre à Jour'}
                    </button>
                }
            >
                <div className="space-y-8 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Client & Contact</h4>
                            <div className="space-y-4">
                                <InputLabel value="Nom Complet" />
                                <TextInput value={editForm.data.client_name} onChange={e => editForm.setData('client_name', e.target.value)} />
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Téléphone" />
                                <TextInput value={editForm.data.client_phone} onChange={e => editForm.setData('client_phone', e.target.value)} />
                            </div>
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Workflow & Status</h4>
                            <div className="space-y-4">
                                <InputLabel value="Statut de la Réservation" />
                                <select 
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                    value={editForm.data.status}
                                    onChange={e => editForm.setData('status', e.target.value)}
                                >
                                    {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                </select>
                            </div>
                            <div className="space-y-4">
                                <InputLabel value="Assignation Staff" />
                                <select 
                                    className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl px-6 py-4 text-sm font-bold transition-all"
                                    value={editForm.data.technician_id}
                                    onChange={e => editForm.setData('technician_id', e.target.value)}
                                >
                                    <option value="">Non assigné</option>
                                    {technicians.map(t => <option key={t.id} value={t.id}>{t.user?.name}</option>)}
                                </select>
                            </div>
                         </div>
                    </div>
                    
                    <div className="space-y-4">
                        <InputLabel value="Notes Administratives" />
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[150px]"
                            value={editForm.data.admin_notes}
                            onChange={e => editForm.setData('admin_notes', e.target.value)}
                            placeholder="Entrez vos notes ici..."
                        />
                    </div>
                </div>
            </FormModal>

            {/* DELETE MODAL */}
            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Supprimer cette réservation ?"
                message={`Cette action supprimera définitivement le rendez-vous #${selectedBooking?.confirmation_code}.`}
                confirmText="Supprimer"
            />
        </AdminLayout>
    )
}
