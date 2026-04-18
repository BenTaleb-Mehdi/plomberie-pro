import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    Calendar, Users, Wrench, ArrowUpRight, 
    Clock, CheckCircle2, MessageSquare, AlertCircle,
    ChevronRight, Droplets, TrendingUp, MoreHorizontal,
    Plus, Sparkles, Camera, Image as ImageIcon, X,
    MapPin, Calendar as CalendarIcon
} from 'lucide-react'
import { StatusBadge } from '@/Components/StatusBadge'
import CountUp from '@/Components/ReactBits/CountUp'
import FormModal from '@/Components/FormModal'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import FileDropzone from '@/Components/FileDropzone'

// Minimalist Sparkline Component
const Sparkline = ({ color = "#3B82F6", data = [10, 40, 30, 50, 20, 90, 60] }) => {
    const points = data.map((val, i) => `${(i * 100) / (data.length - 1)},${100 - val}`).join(' ')
    return (
        <svg viewBox="0 0 100 100" className="w-20 h-10 overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="drop-shadow-sm"
            />
        </svg>
    )
}

export default function Dashboard({ stats, recentBookings, todayBookings, categories }) {
    const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false)

    const form = useForm({
        title: '',
        description: '',
        main_image: null,
        gallery: [],
        category: categories?.[0] || 'Plomberie Générale',
        city: '',
        intervention_date: '',
        is_featured: false,
    })

    const handleQuickAdd = (e) => {
        e.preventDefault()
        form.post(route('admin.projects.store'), {
            onSuccess: () => {
                setIsQuickAddModalOpen(false)
                form.reset()
            }
        })
    }

    const statCards = [
        { label: 'Interventions', value: stats.bookings_today, icon: Calendar, color: 'text-blue-600', trend: '+12%', data: [20, 45, 30, 60, 40, 80, 50] },
        { label: 'En attente', value: stats.bookings_pending, icon: Clock, color: 'text-amber-500', trend: '-2%', data: [50, 40, 60, 30, 50, 20, 30] },
        { label: 'Techniciens', value: stats.technicians, icon: Wrench, color: 'text-emerald-500', trend: '+1', data: [10, 20, 20, 40, 40, 60, 90] },
        { label: 'Support', value: stats.unread_contacts, icon: MessageSquare, color: 'text-indigo-500', trend: '+5%', data: [30, 50, 40, 70, 60, 80, 100] },
    ]

    return (
        <AdminLayout title="Tableau de Bord">
            <Head title="Admin — Dashboard" />

            <div className="flex items-center justify-between mb-12">
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Aperçu Opérationnel</p>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic uppercase">Management Pro</h2>
                </div>
                
                <button 
                    onClick={() => setIsQuickAddModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus size={16} strokeWidth={2.5} /> Publier Intervention
                </button>
            </div>

            {/* Top Minimalist Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 font-sans text-moyen">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                         <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-100`}>
                                <stat.icon size={18} />
                            </div>
                            <Sparkline color={stat.color === 'text-blue-600' ? '#3B82F6' : (stat.color === 'text-amber-500' ? '#F59E0B' : '#10B981')} data={stat.data} />
                         </div>
                         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{stat.label}</p>
                         <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                <CountUp to={stat.value} />
                            </h3>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                                {stat.trend}
                            </span>
                         </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 font-sans text-moyen">
                {/* Main Content Area: Analysis & Schedule */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                                Planning du Jour
                            </h2>
                            <Link href={route('admin.bookings.index')} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:text-blue-600 transition-all shadow-inner">
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {todayBookings.length > 0 ? todayBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-white transition-all group shadow-sm hover:shadow-md">
                                    <div className="w-20 font-bold text-sm text-slate-900">{booking.booking_time}</div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                                            <Droplets size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 truncate tracking-tight leading-none mb-1 text-sm">{booking.client_name}</h4>
                                            <p className="text-[11px] font-medium text-slate-500 truncate">{booking.service_type?.name} — {booking.city}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <StatusBadge status={booking.status} className="scale-90" />
                                        <Link href={route('admin.bookings.show', booking.id)} className="text-slate-300 hover:text-blue-600 transition-colors">
                                            <ChevronRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-500 font-medium text-sm">Agenda vide pour aujourd'hui</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column: Recent & Quick Info */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <h3 className="text-md font-bold text-slate-900 mb-6 tracking-tight">Derniers RDV</h3>
                        <div className="space-y-5 relative z-10">
                             {recentBookings.slice(0, 5).map((booking) => (
                                 <div key={booking.id} className="flex items-start gap-3">
                                     <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm shrink-0 leading-none">
                                        {booking.client_name?.[0]}
                                     </div>
                                     <div className="flex-1 min-w-0 my-auto">
                                         <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-sm font-bold text-slate-900 truncate">{booking.client_name}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Now</span>
                                         </div>
                                         <p className="text-[11px] font-medium text-slate-500 truncate">{booking.service_type?.name}</p>
                                     </div>
                                 </div>
                             ))}
                        </div>
                        <Link href={route('admin.bookings.index')} className="w-full mt-6 py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                            Voir Tout l'Agenda <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="bg-blue-600 rounded-xl p-6 text-white relative overflow-hidden group shadow-md shadow-blue-500/20">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl group-hover:scale-150 transition-transform"></div>
                         <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                            <TrendingUp size={24} strokeWidth={2} />
                         </div>
                         <h3 className="text-xl font-bold mb-2 tracking-tight">Croissance +24%</h3>
                         <p className="text-blue-100 font-medium mb-6 opacity-80 leading-relaxed text-sm">Vos performances opérationnelles augmentent.</p>
                         <button onClick={() => setIsQuickAddModalOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl text-xs hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm">Publier Maintenant</button>
                    </div>
                </div>
            </div>

            {/* QUICK ADD PROJECT MODAL */}
            <FormModal
                show={isQuickAddModalOpen}
                onClose={() => setIsQuickAddModalOpen(false)}
                title="Publication Express"
                maxWidth="3xl"
                footer={
                    <button 
                        disabled={form.processing}
                        onClick={handleQuickAdd}
                        className="px-6 py-3 bg-blue-600 border border-transparent text-white font-bold rounded-xl text-[13px] tracking-wide shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all w-full sm:w-auto"
                    >
                        {form.processing ? 'Lancement...' : 'Ajouter au Portfolio'}
                    </button>
                }
            >
                <div className="space-y-6 py-4 font-sans text-moyen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <InputLabel value="Titre du projet" />
                            <TextInput value={form.data.title} onChange={e => form.setData('title', e.target.value)} placeholder="ex: Réparation SOS Tanger" />
                            <InputError message={form.errors.title} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Domaine de l'intervention" />
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                value={form.data.category}
                                onChange={e => form.setData('category', e.target.value)}
                            >
                                {categories?.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <InputLabel value="Ville" />
                            <TextInput value={form.data.city} onChange={e => form.setData('city', e.target.value)} placeholder="ex: Tanger..." />
                            <InputError message={form.errors.city} />
                        </div>
                        <div className="space-y-4">
                            <InputLabel value="Date" />
                            <input 
                                type="date"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                value={form.data.intervention_date}
                                onChange={e => form.setData('intervention_date', e.target.value)}
                            />
                            <InputError message={form.errors.intervention_date} />
                        </div>
                    </div>

                    <FileDropzone 
                        label="Image Principale"
                        value={form.data.main_image}
                        onChange={(file) => form.setData('main_image', file)}
                    />
                    <InputError message={form.errors.main_image} />

                    <FileDropzone 
                        label="Gallérie Photos"
                        multiple={true}
                        value={form.data.gallery}
                        onChange={(files) => form.setData('gallery', files)}
                    />

                    <div className="space-y-4">
                        <InputLabel value="Note de réalisation" />
                        <textarea 
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none min-h-[140px] resize-none"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                        />
                         <InputError message={form.errors.description} />
                    </div>
                </div>
            </FormModal>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            `}} />
        </AdminLayout>
    )
}
