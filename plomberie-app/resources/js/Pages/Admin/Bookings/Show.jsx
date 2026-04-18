import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { StatusBadge } from '@/Components/StatusBadge'
import FormModal from '@/Components/FormModal'
import { 
    Calendar, Clock, MapPin, Phone, Mail, 
    User, Wrench, CheckCircle2, AlertCircle,
    ArrowLeft, History, MessageSquare, ClipboardList,
    MoreVertical, Edit2, UserPlus, FileText, CheckCircle
} from 'lucide-react'

export default function BookingsShow({ booking, technicians }) {
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

    const statusForm = useForm({
        status: booking.status,
        admin_notes: booking.admin_notes || '',
    })

    const assignForm = useForm({
        technician_id: booking.technician_id || '',
    })

    const handleUpdateStatus = (e) => {
        e.preventDefault()
        statusForm.put(route('admin.bookings.update', booking.id), {
            onSuccess: () => setIsStatusModalOpen(false)
        })
    }

    const handleAssign = (e) => {
        e.preventDefault()
        assignForm.put(route('admin.bookings.update', booking.id), {
            onSuccess: () => setIsAssignModalOpen(false)
        })
    }

    // Prepare status logs for timeline representation
    const timeline = (booking.status_logs || []).map(log => ({
        label: log.new_status === 'pending' ? 'Demande Reçue' : 
               (log.new_status === 'confirmed' ? 'Réservée' : 
               (log.new_status === 'in_progress' ? 'Intervention Lancée' : 
               (log.new_status === 'completed' ? 'Mission Terminée' : 'Annulée'))),
        date: new Date(log.created_at).toLocaleString(),
        notes: log.admin_notes,
        user: log.changed_by?.name,
        status: log.new_status
    }))

    return (
        <AdminLayout title={`Détails Réservation #${booking.confirmation_code}`}>
            <Head title={`Admin — #${booking.confirmation_code}`} />

            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.bookings.index')} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="h-6 w-px bg-slate-200 mx-2"></div>
                    <StatusBadge status={booking.status} className="scale-110 origin-left" />
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsStatusModalOpen(true)}
                        className="px-6 py-4 bg-white border border-slate-100 text-slate-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                    >
                        <CheckCircle size={14} className="text-emerald-500" /> Modifier Statut
                    </button>
                    <button 
                        onClick={() => setIsAssignModalOpen(true)}
                        className="px-6 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
                    >
                        <UserPlus size={14} className="text-blue-400" /> Réassigner
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 font-sans text-moyen">
                {/* Main Information */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 border-b border-slate-50 pb-6 flex items-center gap-2">
                                <User size={14} className="text-blue-600" /> Dossier Client
                            </h3>
                            
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="flex-1 space-y-10 w-full">
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {booking.client_name?.[0]}
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{booking.client_name}</h1>
                                            <div className="flex flex-wrap gap-6">
                                                <span className="text-sm font-bold text-slate-500 flex items-center gap-2"><Phone size={14} className="text-blue-500" /> {booking.client_phone}</span>
                                                <span className="text-sm font-bold text-slate-500 flex items-center gap-2"><Mail size={14} className="text-blue-500" /> {booking.client_email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Calendar size={12} className="text-blue-600" /> Planification</p>
                                            <p className="text-lg font-black text-slate-900 mb-1 capitalize">{new Date(booking.booking_date).toLocaleDateString()}</p>
                                            <p className="text-sm font-bold text-slate-500 flex items-center gap-2"><Clock size={14} className="text-amber-500" /> {booking.booking_time}</p>
                                        </div>
                                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MapPin size={12} className="text-emerald-500" /> Localisation</p>
                                            <p className="text-lg font-black text-slate-900 mb-1">{booking.city}</p>
                                            <p className="text-sm font-bold text-slate-500 truncate">{booking.client_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 border-b border-slate-50 pb-6 flex items-center gap-2">
                            <History size={14} className="text-blue-600" /> Journal d'Activité
                        </h3>
                        
                        <div className="relative pl-12 space-y-12">
                            <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-slate-50 rounded-full"></div>
                            
                            {timeline.length > 0 ? timeline.map((entry, i) => (
                                <div key={i} className="relative group">
                                     <div className={`absolute -left-[54px] top-0 w-12 h-12 rounded-2xl border-4 border-white flex items-center justify-center z-10 transition-all shadow-sm
                                        ${entry.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <div className="w-2 h-2 rounded-full bg-current"></div>
                                     </div>
                                     <div>
                                         <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-black text-slate-900 tracking-tight">{entry.label}</span>
                                            <span className="text-[10px] font-black text-slate-300 uppercase shrink-0">{entry.date}</span>
                                         </div>
                                         <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                                            <User size={10} /> Mis à jour par {entry.user || 'Système'}
                                         </p>
                                         {entry.notes && (
                                             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 text-xs text-slate-600 font-medium italic">
                                                "{entry.notes}"
                                             </div>
                                         )}
                                     </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center opacity-20">
                                    <ClipboardList size={48} className="mx-auto mb-4" />
                                    <p className="font-black uppercase tracking-widest text-[10px]">Aucun historique pour le moment</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Technician Panel */}
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                        
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-2">
                            <Wrench size={14} className="text-blue-500" /> Intervention Technique
                        </h4>

                        {booking.technician ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-6 backdrop-blur-md ring-4 ring-white/5 border border-white/10 group-hover:scale-105 transition-all">
                                    <span className="text-3xl font-black text-blue-400 capitalize">{booking.technician.user?.name?.[0]}</span>
                                </div>
                                <h4 className="text-xl font-black mb-1">{booking.technician.user?.name}</h4>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-10">
                                    {booking.technician.specialty || 'Expert Pro'}
                                </p>
                                
                                <div className="w-full space-y-3">
                                    <a href={`tel:${booking.technician.user?.phone}`} className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        <Phone size={14} /> Contacter
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center py-6">
                                <div className="w-20 h-20 bg-rose-500/20 rounded-[1.8rem] flex items-center justify-center mb-6 ring-4 ring-rose-500/5 animate-pulse">
                                    <AlertCircle size={36} className="text-rose-500" />
                                </div>
                                <h4 className="text-lg font-black mb-1 text-rose-100">En attente d'expert</h4>
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-10">Action requise</p>
                                <button onClick={() => setIsAssignModalOpen(true)} className="w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all shadow-xl shadow-blue-600/20">
                                    Assigner Maintenant
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Services & Notes */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
                             <FileText size={14} className="text-emerald-500" /> Détails Service
                        </h4>
                        
                        <div className="space-y-8">
                            <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><Droplets size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Type de service</p>
                                    <p className="text-sm font-black text-slate-900 tracking-tight">{booking.service_type?.name}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Description Client</p>
                                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100/50 text-sm font-bold text-slate-600 leading-relaxed italic relative">
                                    <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-50 rotate-45 border-l border-t border-slate-100/50"></div>
                                    "{booking.notes || 'Pas de notes client.'}"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <FormModal
                show={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title="Mise à Jour du Statut"
                footer={
                    <button 
                        onClick={handleUpdateStatus}
                        className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20"
                        disabled={statusForm.processing}
                    >
                        Confirmer le Changement
                    </button>
                }
            >
                <div className="space-y-8 py-4 px-2">
                    <div className="space-y-4 font-sans text-moyen">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nouveau Statut de l'Intervention</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(s => (
                                <button 
                                    key={s}
                                    type="button"
                                    onClick={() => statusForm.setData('status', s)}
                                    className={`p-5 rounded-2xl border transition-all text-center flex flex-col items-center gap-2
                                        ${statusForm.data.status === s 
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' 
                                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-200'
                                        }`}
                                >
                                    <StatusBadge status={s} className={statusForm.data.status === s ? 'text-white bg-white/20' : ''} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 font-sans text-moyen">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notes Administrateur (Optionnel)</label>
                        <textarea 
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] px-8 py-6 text-sm font-bold transition-all min-h-[120px]"
                            value={statusForm.data.admin_notes}
                            onChange={e => statusForm.setData('admin_notes', e.target.value)}
                            placeholder="Ex: Technicien en route, Matériel prêt..."
                        />
                    </div>
                </div>
            </FormModal>

            <FormModal
                show={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                title="Attribution Technicien"
                footer={
                    <button 
                        onClick={handleAssign}
                        className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20"
                        disabled={assignForm.processing}
                    >
                        Valider l'Assignation
                    </button>
                }
            >
                <div className="space-y-8 py-4 font-sans text-moyen">
                    <p className="text-slate-500 font-bold mb-6">Sélectionnez l'expert qui interviendra sur cette mission # {booking.confirmation_code}.</p>
                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {technicians.map((tech) => (
                            <button
                                key={tech.id}
                                type="button"
                                onClick={() => assignForm.setData('technician_id', tech.id)}
                                className={`p-6 rounded-3xl border transition-all flex items-center justify-between group
                                    ${assignForm.data.technician_id === tech.id 
                                        ? 'bg-blue-50 border-blue-600 shadow-lg' 
                                        : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors shadow-inner
                                        ${assignForm.data.technician_id === tech.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-300 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                        {tech.user?.name?.[0]}
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-black tracking-tight ${assignForm.data.technician_id === tech.id ? 'text-blue-900' : 'text-slate-900'}`}>{tech.user?.name}</p>
                                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">{tech.specialty || 'Plombier Expert'}</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                    ${assignForm.data.technician_id === tech.id ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                                    {assignForm.data.technician_id === tech.id && <CheckCircle size={14} className="text-white" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </FormModal>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
            `}} />
        </AdminLayout>
    )
}

function Droplets({ size = 24, className = "" }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4z"></path><path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4z"></path></svg>;
}
