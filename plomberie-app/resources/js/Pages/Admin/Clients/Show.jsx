import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    User, Phone, Mail, MapPin, 
    Calendar, FileText, ArrowLeft, 
    Clock, CheckCircle2, AlertCircle,
    ChevronRight, Droplets
} from 'lucide-react'
import { StatusBadge } from '@/Components/StatusBadge'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'

export default function Show({ client }) {
    return (
        <AdminLayout title={`Profil Client: ${client.name}`}>
            <Head title={`Admin — ${client.name}`} />

            <Link href={route('admin.clients.index')} className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors mb-10 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour à la liste
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information Card */}
                <div className="lg:col-span-1 space-y-8">
                    <SpotlightCard className="rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-900/5 pt-12 pb-10 px-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                        
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl mb-6 shadow-2xl shadow-indigo-900/20">
                                {client.name[0]}
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{client.name}</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8 px-3 py-1 bg-blue-50 rounded-full inline-block">Client Particulier</p>

                            <div className="w-full space-y-4 text-left">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400"><Phone size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Téléphone</span>
                                        <span className="text-sm font-bold text-slate-700">{client.phone || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400"><Mail size={18} /></div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</span>
                                        <span className="text-sm font-bold text-slate-700 truncate">{client.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400"><Calendar size={18} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inscrit le</span>
                                        <span className="text-sm font-bold text-slate-700">12 Mai 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                         <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                         <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Résumé Activité</h3>
                         <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                 <p className="text-3xl font-black mb-1">{client.bookings?.length || 0}</p>
                                 <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">RDV Totaux</p>
                             </div>
                             <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                                 <p className="text-3xl font-black mb-1 text-emerald-400">0</p>
                                 <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Annulations</p>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Bookings History */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-900/5">
                        <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
                            <Clock size={28} className="text-blue-600" /> Historique des Interventions
                        </h3>

                        <div className="space-y-6">
                            {client.bookings?.length > 0 ? client.bookings.map((booking) => (
                                <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-slate-200 transition-all gap-6 group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                                            <Droplets size={26} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-black text-slate-900 text-lg tracking-tight">{booking.service_type?.name}</h4>
                                                <span className="text-[10px] font-bold text-slate-400">#{booking.confirmation_code}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {booking.booking_date}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="flex items-center gap-1.5"><MapPin size={14} /> {booking.city}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-4 md:pt-0 border-slate-200">
                                        <StatusBadge status={booking.status} />
                                        <Link href={route('admin.bookings.show', booking.id)} className="w-11 h-11 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:text-blue-600 hover:border-blue-600 transition-all active:scale-95 group-hover:shadow-lg group-hover:shadow-blue-600/5">
                                            <ChevronRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                    <AlertCircle size={48} className="text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 font-bold">Aucune réservation pour ce client.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Private Admin Notes */}
                    <div className="bg-amber-50 rounded-[3rem] p-10 border border-amber-100/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <h3 className="text-lg font-black text-amber-900 mb-6 flex items-center gap-2 tracking-tight">
                            <FileText size={20} /> Notes Administratives Privées
                        </h3>
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-amber-200/30">
                            <p className="text-amber-800 text-sm font-medium leading-relaxed italic">
                                "Client régulier, préfère les interventions en fin de journée. Très satisfait du dernier changement de chauffe-eau."
                            </p>
                        </div>
                        <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors">Modifier les notes</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
