import { Head } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { 
    BarChart3, TrendingUp, DollarSign, Users, 
    Calendar, CheckCircle2, ArrowUpRight, ArrowDownRight,
    PieChart, Activity
} from 'lucide-react'

// Simple SVG Chart Component for Reports
const AreaChart = ({ color = "#3B82F6", data = [20, 45, 35, 60, 40, 80, 50, 90, 70, 100, 85, 120] }) => {
    const points = data.map((val, i) => `${(i * 100) / (data.length - 1)},${100 - val}`).join(' ')
    const fillPoints = `0,100 ${points} 100,100`
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polyline fill={`url(#grad-${color.replace('#','')})`} points={fillPoints} />
            <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>
    )
}

export default function ReportsIndex({ total_bookings, revenue_estimate }) {
    const reportStats = [
        { label: 'Revenu Estimé', value: '12,450 DH', icon: DollarSign, trend: '+14%', up: true, color: 'text-emerald-500' },
        { label: 'Taux de Conversion', value: '68%', icon: Activity, trend: '+5.2%', up: true, color: 'text-blue-500' },
        { label: 'Annulations', value: '4%', icon: ArrowDownRight, trend: '-1%', up: false, color: 'text-rose-500' },
        { label: 'Satisfaction', value: '4.8/5', icon: CheckCircle2, trend: '+0.2', up: true, color: 'text-amber-500' },
    ]

    return (
        <AdminLayout title="Analytique & Rapports">
            <Head title="Admin — Rapports" />

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {reportStats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/20 transition-all group">
                         <div className="flex items-center justify-between mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {stat.trend}
                            </div>
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                         <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Trends Chart */}
                <div className="lg:col-span-8 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2 text-moyen">Évolution des Interventions</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Performances mensuelles (Volume vs Temps)</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-5 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Export PDF</button>
                        </div>
                    </div>
                    
                    <div className="aspect-[21/9] w-full relative mb-12">
                         <AreaChart color="#3B82F6" />
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-50">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pic Mensuel</p>
                            <span className="text-xl font-black text-slate-900 leading-none">42 RDV</span>
                        </div>
                        <div className="text-center border-x border-slate-100 px-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Moyenne / Sem</p>
                            <span className="text-xl font-black text-slate-900 leading-none">12.5</span>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Projetés</p>
                            <span className="text-xl font-black text-blue-600 leading-none">+18%</span>
                        </div>
                    </div>
                </div>

                {/* Popular Services Breakdown */}
                <div className="lg:col-span-4 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-10 text-moyen">Services Populaires</h2>
                    <div className="space-y-8">
                        {[
                            { name: 'Détection Fuite', count: 45, color: '#3B82F6', percent: 85 },
                            { name: 'Débouchage Pro', count: 32, color: '#10B981', percent: 65 },
                            { name: 'Rénovation Sanitaire', count: 18, color: '#F59E0B', percent: 40 },
                            { name: 'Chauffe-eau', count: 12, color: '#6366F1', percent: 25 },
                        ].map((s, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-900">{s.name}</span>
                                    <span className="text-slate-400">{s.count} rdv</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <PieChart size={64} />
                         </div>
                         <h4 className="text-sm font-black text-blue-900 mb-2">Insight du mois</h4>
                         <p className="text-[10px] font-bold text-blue-700/60 leading-relaxed uppercase tracking-widest">Le service "Détection Fuite" génère 42% de votre revenu ce mois-ci.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 pb-12">
                <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                     <h3 className="text-xl font-black mb-6 tracking-tight flex items-center gap-2">
                        <TrendingUp size={24} className="text-blue-500" /> Croissance Régionale
                     </h3>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
                        La zone "Tanger Médina" est en forte croissance avec une augmentation de +28% du volume de réservations par rapport au trimestre précédent.
                     </p>
                     <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-blue-400">
                        Détails par zone
                     </button>
                </div>

                <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-2">
                        <Users size={24} className="text-blue-600" /> Top Techniciens
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Omar Charaï', rate: '4.9', tasks: 24 },
                            { name: 'Mehdi Ben', rate: '4.7', tasks: 18 },
                        ].map((t, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-blue-600 text-[10px]">{t.name[0]}</div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{t.name}</p>
                                        <div className="flex items-center gap-1 text-[9px] font-black text-amber-500"><Star size={10} fill="currentColor" /> {t.rate} Satisfaction</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.tasks} interventions</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

function Star({ size = 24, fill = "none" }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
}
