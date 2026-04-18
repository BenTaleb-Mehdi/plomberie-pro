import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { StatusBadge } from '@/Components/StatusBadge'
import Pagination from '@/Components/Pagination'
import { Calendar, Clock, MapPin, Wrench, ChevronRight, FileText, Plus } from 'lucide-react'

export default function Dashboard({ bookings }) {
    return (
        <PublicLayout>
            <Head title="Mon Espace — Plomberie Pro" />

            <div className="bg-slate-50 min-h-screen pt-12 pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tableau de bord</h1>
                            <p className="text-slate-500 font-medium mt-2">Gérez vos réservations et interventions en cours.</p>
                        </div>
                        <Link href={route('booking.create')}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-0.5 active:scale-95">
                            <Plus size={20} strokeWidth={3} /> Nouvelle Réservation
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Total Réservations</h3>
                                <p className="text-4xl font-black text-slate-900">{bookings.total}</p>
                            </div>

                            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:opacity-100 transition-opacity opacity-50"></div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2 relative z-10">Assistance Directe</h3>
                                <p className="text-white font-bold mb-6 relative z-10">Besoin d'aide pour une réservation existante ?</p>
                                <Link href={route('contact.index')} className="inline-flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-[10px] relative z-10 hover:text-white transition-colors">
                                    Contacter le support <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Bookings List */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Wrench size={20} className="text-blue-600" /> Historique des Interventions
                            </h2>

                            {bookings.data.length > 0 ? (
                                <>
                                    {bookings.data.map((booking) => (
                                        <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-900/5 border border-slate-50 hover:border-blue-100 transition-all group">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-start gap-5">
                                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                        <Droplets size={28} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h4 className="font-black text-slate-900">{booking.service_type?.name}</h4>
                                                            <StatusBadge status={booking.status} />
                                                        </div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ref: {booking.confirmation_code}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Planifié le</span>
                                                        <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                                            <Calendar size={14} className="text-blue-600" /> {booking.booking_date}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Heure</span>
                                                        <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                                            <Clock size={14} className="text-blue-600" /> {booking.booking_time}
                                                        </span>
                                                    </div>
                                                    <Link 
                                                        href={route('client.bookings.show', booking.id)}
                                                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                                                    >
                                                        <ChevronRight size={20} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Pagination links={bookings.links} />
                                </>
                            ) : (
                                <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 p-20 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                                        <FileText size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-400 mb-2">Aucune réservation pour le moment</h3>
                                    <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8">Commencez par réserver votre première intervention professionnelle.</p>
                                    <Link href={route('booking.create')} className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline underline-offset-8">
                                        Réserver maintenant
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
