import { useState } from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import Pagination from '@/Components/Pagination'
import FormModal from '@/Components/FormModal'
import ConfirmationModal from '@/Components/ConfirmationModal'
import { 
    MessageSquare, Mail, User, Phone, 
    Calendar, Clock, Trash2, Eye, 
    CheckCircle, Reply, Archive, Search
} from 'lucide-react'

export default function ContactsIndex({ contacts }) {
    const [selectedContact, setSelectedContact] = useState(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const openDetailModal = (contact) => {
        setSelectedContact(contact)
        setIsDetailModalOpen(true)
    }

    const openDeleteModal = (contact) => {
        setSelectedContact(contact)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        router.delete(route('admin.contacts.destroy', selectedContact.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false)
                setIsDetailModalOpen(false)
            }
        })
    }

    return (
        <AdminLayout title="Messages & Support">
            <Head title="Admin — Messages" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 group w-full md:max-w-xl">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input type="text" placeholder="Rechercher par nom, email ou sujet..." 
                            className="w-full bg-transparent border-transparent focus:ring-0 rounded-xl pl-12 py-2 text-[13px] font-medium transition-all placeholder:text-slate-400" />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:text-blue-600 hover:bg-slate-50 transition-all shadow-sm">
                        Tout Marquer comme lu
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50">
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Expéditeur</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Message / Sujet</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Reçu le</th>
                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {contacts.data.map((contact) => (
                                <tr key={contact.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => openDetailModal(contact)}>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-[11px] uppercase group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {contact.name[0]}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[13px] font-bold text-slate-900 truncate tracking-tight">{contact.name}</span>
                                                <span className="text-[11px] font-medium text-slate-500 truncate">{contact.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 max-w-md">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[13px] font-bold text-slate-700 truncate">{contact.subject || 'Pas de sujet'}</span>
                                            <p className="text-[11px] font-medium text-slate-500 truncate">{contact.message}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[13px] font-medium text-slate-900">{new Date(contact.created_at).toLocaleDateString()}</span>
                                            <span className="text-[11px] font-medium text-slate-500">À {new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={(e) => { e.stopPropagation(); openDetailModal(contact); }} className="w-8 h-8 flex items-center justify-center bg-slate-50 shadow-sm border border-slate-200 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all">
                                                <Eye size={14} />
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); openDeleteModal(contact); }} className="w-8 h-8 flex items-center justify-center bg-slate-50 shadow-sm border border-slate-200 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-all">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {contacts.data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-5 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center opacity-50">
                                            <MessageSquare size={32} className="mb-2" />
                                            <p className="font-bold text-sm">Aucun message pour le moment</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
                    <Pagination links={contacts.links} />
                </div>
            </div>

            {/* DETAIL MODAL */}
            <FormModal
                show={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Détails du Message"
                maxWidth="3xl"
                footer={
                    <div className="flex items-center justify-between w-full">
                         <button 
                            onClick={() => openDeleteModal(selectedContact)}
                            className="px-4 py-2 border border-rose-200 text-rose-500 font-bold rounded-xl text-xs hover:bg-rose-50 transition-all"
                        >
                            Supprimer
                        </button>
                        <div className="flex gap-4">
                            <button className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                <Reply size={14} /> Répondre par Email
                            </button>
                        </div>
                    </div>
                }
            >
                {selectedContact && (
                    <div className="space-y-6 py-4">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-wrap gap-8 items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                                    <User size={16} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Nom</p>
                                    <p className="text-[13px] font-bold text-slate-900 tracking-tight">{selectedContact.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Email</p>
                                    <p className="text-[13px] font-bold text-slate-900 tracking-tight">{selectedContact.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-amber-500">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">Date de Réception</p>
                                    <p className="text-[13px] font-bold text-slate-900 tracking-tight">{new Date(selectedContact.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-700">Corps du Message</h4>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[150px] text-[13px] text-slate-600 leading-relaxed font-medium">
                                {selectedContact.message}
                            </div>
                        </div>

                        {selectedContact.phone && (
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50/50 p-4 rounded-xl inline-block px-10">
                                <Phone size={16} /> Appeler le client: {selectedContact.phone}
                            </div>
                        )}
                    </div>
                )}
            </FormModal>

            {/* DELETE MODAL */}
            <ConfirmationModal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Supprimer le message ?"
                message="Voulez-vous vraiment supprimer ce message de support ?"
                confirmText="Oui, Supprimer"
            />
        </AdminLayout>
    )
}
