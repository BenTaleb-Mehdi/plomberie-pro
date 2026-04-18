import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Save, X, Calendar, Clock, 
    User, Wrench, AlertCircle, CheckCircle2 
} from 'lucide-react'

export default function BookingsEdit({ booking, technicians, statuses }) {
    const { data, setData, put, processing, errors } = useForm({
        status: booking.status,
        technician_id: booking.technician_id || '',
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        admin_notes: booking.admin_notes || '',
    })

    const submit = (e) => {
        e.preventDefault()
        put(route('admin.bookings.update', booking.id))
    }

    return (
        <AdminLayout title={`Modifier #${booking.confirmation_code}`}>
            <Head title={`Admin — Modifier #${booking.confirmation_code}`} />

            <form onSubmit={submit} className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Form Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Statut & Assignation</h3>
                            
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">État de la Demande</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {statuses.map((status) => (
                                            <button key={status} type="button" 
                                                onClick={() => setData('status', status)}
                                                className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex flex-col items-center gap-2
                                                    ${data.status === status 
                                                        ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20' 
                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600'}`}>
                                                <CheckCircle2 size={16} /> {status}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.status && <p className="text-rose-500 text-[10px] font-bold mt-2 uppercase">{errors.status}</p>}
                                </div>

                                <div className="pt-8 border-t border-slate-50">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Technicien en Charge</label>
                                    <div className="relative group">
                                        <Wrench size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <select 
                                            value={data.technician_id} 
                                            onChange={e => setData('technician_id', e.target.value)}
                                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 transition-all appearance-none"
                                        >
                                            <option value="">Non assigné</option>
                                            {technicians.map(tech => (
                                                <option key={tech.id} value={tech.id}>{tech.user?.name} ({tech.specialty})</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.technician_id && <p className="text-rose-500 text-[10px] font-bold mt-2 uppercase">{errors.technician_id}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Notes Internes</h3>
                            <textarea 
                                value={data.admin_notes}
                                onChange={e => setData('admin_notes', e.target.value)}
                                placeholder="Instructions pour le technicien, détails sur l'intervention..."
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-100 rounded-[2rem] p-6 text-sm font-medium text-slate-600 min-h-[200px] transition-all resize-none"
                            ></textarea>
                            <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                                <AlertCircle size={12} /> Ces notes sont uniquement visibles par l'équipe administrative.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Schedule Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 rounded-[2.5rem] border-2 border-slate-100/50 p-10">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Replanification</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2 block">Nouvelle Date</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="date" 
                                            value={data.booking_date}
                                            onChange={e => setData('booking_date', e.target.value)}
                                            className="w-full bg-white border-slate-200 rounded-xl pl-11 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2 block">Nouveau Créneau</label>
                                    <div className="relative">
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="time" 
                                            value={data.booking_time}
                                            onChange={e => setData('booking_time', e.target.value)}
                                            className="w-full bg-white border-slate-200 rounded-xl pl-11 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Action Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl shadow-slate-200 animate-in slide-in-from-bottom-5">
                             <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                                <Save size={16} className="text-blue-600" /> Confirmer les modifs
                             </h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">Toutes les modifications prennent effet immédiatement.</p>
                             <div className="space-y-3">
                                 <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100 disabled:opacity-50">
                                    {processing ? 'Enregistrement...' : 'Mettre à jour'}
                                 </button>
                                 <Link href={route('admin.bookings.show', booking.id)} 
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
