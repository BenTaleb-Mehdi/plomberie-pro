import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Wrench, Star, Phone, Mail, MapPin, 
    Calendar, CheckCircle2, ChevronRight, BarChart3,
    ArrowLeft, Clock, Zap
} from 'lucide-react'

export default function TechniciansShow({ technician }) {
    const stats = [
        { label: 'Taux Succès', value: '98%', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Vitesse Intervention', value: '45m', icon: Zap, color: 'text-amber-600 bg-amber-50' },
        { label: 'Évaluation', value: '4.9', icon: Star, color: 'text-indigo-600 bg-indigo-50' },
    ]

    return (
        <AdminLayout title={`Profil de ${technician.user?.name}`}>
            <Head title={`Admin — Technicien ${technician.user?.name}`} />

            <div className="mb-10 flex items-center gap-4">
                <Link href={route('admin.technicians.index')} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <ArrowLeft size={20} />
                </Link>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span> Disponible
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Profile Card Column */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mb-6 shadow-2xl shadow-blue-200 rotate-2 group-hover:rotate-0 transition-all duration-500">
                                <span className="text-3xl font-black">{technician.user?.name?.[0]}</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1">{technician.user?.name}</h2>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-8">{technician.specialty}</p>
                            
                            <div className="w-full space-y-4 pt-10 border-t border-slate-50">
                                <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={18} /></div>
                                    {technician.user?.phone || 'Non renseigné'}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={18} /></div>
                                    <span className="truncate">{technician.user?.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><MapPin size={18} /></div>
                                    {technician.zone}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-200">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Informations Internes</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-400">Date d'embauche</span>
                                <span className="text-xs font-black uppercase">12 Oct 2024</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-400">ID Employé</span>
                                <span className="text-xs font-black uppercase tracking-tighter">#TECH-00{technician.id}</span>
                            </div>
                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-widest hover:bg-white/10 transition-all mt-4">Retirer du système</button>
                        </div>
                    </div>
                </div>

                {/* Dashboard & History Column */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} mb-4 transition-transform group-hover:scale-110`}>
                                    <stat.icon size={22} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</h4>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <BarChart3 size={24} className="text-blue-600" /> Missions Récentes
                            </h2>
                            <div className="flex bg-slate-50 p-1 rounded-xl">
                                <button className="px-4 py-2 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">Index</button>
                                <button className="px-4 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:text-slate-800 transition-colors">Calendrier</button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {technician.technician_bookings?.length > 0 ? technician.technician_bookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                                     <div className="flex items-center gap-5">
                                         <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 transition-colors">
                                             <Clock size={20} />
                                         </div>
                                         <div>
                                             <h4 className="text-sm font-bold text-slate-800">{booking.service_type?.name}</h4>
                                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">
                                                 #{booking.confirmation_code} — {booking.booking_date}
                                             </p>
                                         </div>
                                     </div>
                                     <div className="flex items-center gap-4">
                                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{booking.booking_time}</span>
                                         <Link href={route('admin.bookings.show', booking.id)} className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                                             <ChevronRight size={18} />
                                         </Link>
                                     </div>
                                </div>
                            )) : (
                                <div className="py-20 text-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">Aucune mission assignée récemment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
