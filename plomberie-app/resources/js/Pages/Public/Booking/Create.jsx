import { useState, useMemo } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { StepIndicator } from '@/Components/Booking/StepIndicator'
import { 
    Calendar, Clock, User, Phone, Mail, MapPin, 
    FileText, ArrowLeft, ArrowRight, CheckCircle2,
    Check, Droplets
} from 'lucide-react'
import BlurText from '@/Components/ReactBits/BlurText'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import ShinyText from '@/Components/ReactBits/ShinyText'
import CountUp from '@/Components/ReactBits/CountUp'

export default function Create({ serviceTypes = [], cities = [] }) {
    const [step, setStep] = useState(1)

    const { data, setData, post, processing, errors, transform } = useForm({
        service_type_id: '',
        booking_date: '',
        booking_time: '',
        client_name: '',
        client_phone: '',
        client_email: '',
        client_address: '',
        city: '',
        notes: '',
    })

    const selectedService = useMemo(() => 
        serviceTypes.find(s => s.id === parseInt(data.service_type_id)),
        [data.service_type_id, serviceTypes]
    )

    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00', 
        '14:00', '15:00', '16:00', '17:00'
    ]

    const nextStep = () => setStep(s => Math.min(3, s + 1))
    const prevStep = () => setStep(s => Math.max(1, s - 1))

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('booking.store'))
    }

    return (
        <PublicLayout>
            <Head title="Réserver mon intervention — Plomberie Pro" />

            <div className="bg-slate-50 min-h-screen pt-24 pb-32 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    
                    <div className="text-center mb-10">
                        <BlurText 
                            text="Réserver une intervention"
                            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
                            delay={100}
                        />
                        <p className="text-slate-500 font-medium mt-4">Suivez les 3 étapes pour confirmer votre rendez-vous professionnel.</p>
                    </div>

                    <StepIndicator currentStep={step} />

                    <SpotlightCard className="rounded-[2.5rem] shadow-2xl shadow-slate-900/5 overflow-hidden">
                        <div className="bg-white p-6 md:p-12 relative group h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10">

                            {/* STEP 1: SERVICE SELECTION */}
                            {step === 1 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">1</div>
                                        Quel est votre besoin ?
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {serviceTypes.map(service => (
                                            <label 
                                                key={service.id}
                                                className={`
                                                    relative flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all active:scale-[0.98]
                                                    ${data.service_type_id == service.id 
                                                        ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-600/5' 
                                                        : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'}
                                                `}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="service_type_id" 
                                                    value={service.id}
                                                    className="sr-only"
                                                    onChange={e => setData('service_type_id', e.target.value)}
                                                />
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-bold text-slate-900">{service.name}</h3>
                                                    {data.service_type_id == service.id && (
                                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white scale-125">
                                                            <Check size={14} strokeWidth={4} />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{service.description}</p>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-auto flex items-center gap-1.5">
                                                    <Clock size={12} /> {service.duration_minutes} min
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.service_type_id && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl">{errors.service_type_id}</p>}
                                    
                                    <div className="mt-12 flex justify-end">
                                        <button 
                                            type="button" 
                                            onClick={nextStep}
                                            disabled={!data.service_type_id}
                                            className="px-10 py-4 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3"
                                        >
                                            Suivant <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: DETAILS */}
                            {step === 2 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-black text-slate-800 mb-10 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">2</div>
                                        Détails de l'intervention
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        {/* Date Section */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                    <Calendar size={14} className="text-blue-600" /> Date du rendez-vous
                                                </label>
                                                <input 
                                                    type="date" 
                                                    value={data.booking_date}
                                                    onChange={e => setData('booking_date', e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                                />
                                                {errors.booking_date && <p className="mt-2 text-xs font-bold text-red-500">{errors.booking_date}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                                                    <Clock size={14} className="text-blue-600" /> Créneau Horaire
                                                </label>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {timeSlots.map(time => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => setData('booking_time', time)}
                                                            className={`
                                                                py-3 text-xs font-bold rounded-xl border-2 transition-all
                                                                ${data.booking_time === time 
                                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                                                                    : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'}
                                                            `}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.booking_time && <p className="mt-3 text-xs font-bold text-red-500">{errors.booking_time}</p>}
                                            </div>
                                        </div>

                                        {/* Contact Section */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                    <User size={14} className="text-blue-600" /> Nom Complet
                                                </label>
                                                <input 
                                                    type="text" 
                                                    value={data.client_name}
                                                    placeholder="Prénom Nom"
                                                    onChange={e => setData('client_name', e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                                />
                                                {errors.client_name && <p className="mt-2 text-xs font-bold text-red-500">{errors.client_name}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                        <Phone size={14} className="text-blue-600" /> Téléphone
                                                    </label>
                                                    <input 
                                                        type="tel" 
                                                        value={data.client_phone}
                                                        placeholder="0612345678"
                                                        onChange={e => setData('client_phone', e.target.value)}
                                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                                    />
                                                    {errors.client_phone && <p className="mt-2 text-xs font-bold text-red-500">{errors.client_phone}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                        <MapPin size={14} className="text-blue-600" /> Ville
                                                    </label>
                                                    <select 
                                                        value={data.city}
                                                        onChange={e => setData('city', e.target.value)}
                                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                                    >
                                                        <option value="">Choisir</option>
                                                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                    {errors.city && <p className="mt-2 text-xs font-bold text-red-500">{errors.city}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                    <Mail size={14} className="text-blue-600" /> Email
                                                </label>
                                                <input 
                                                    type="email" 
                                                    value={data.client_email}
                                                    placeholder="votre@email.com"
                                                    onChange={e => setData('client_email', e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                                />
                                                {errors.client_email && <p className="mt-2 text-xs font-bold text-red-500">{errors.client_email}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                    <MapPin size={14} className="text-blue-600" /> Adresse d'intervention
                                                </label>
                                                <textarea 
                                                    rows="2"
                                                    value={data.client_address}
                                                    placeholder="Numéro, Rue, Quartier..."
                                                    onChange={e => setData('client_address', e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none resize-none"
                                                ></textarea>
                                                {errors.client_address && <p className="mt-2 text-xs font-bold text-red-500">{errors.client_address}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-16 flex justify-between">
                                        <button 
                                            type="button" 
                                            onClick={prevStep}
                                            className="px-8 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center gap-2"
                                        >
                                            <ArrowLeft size={20} /> Retour
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={nextStep}
                                            disabled={!data.booking_date || !data.booking_time || !data.client_name || !data.client_phone || !data.city || !data.client_address}
                                            className="px-10 py-4 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3"
                                        >
                                            Suivant <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: REVIEW */}
                            {step === 3 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="text-xl font-black text-slate-800 mb-10 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">3</div>
                                        Confirmation finale
                                    </h2>

                                    <div className="bg-slate-50 rounded-[2rem] p-8 space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Service Sélectionné</span>
                                                    <span className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                                        <Droplets size={18} className="text-blue-600" /> {selectedService?.name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Date & Heure</span>
                                                    <span className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                                        <Calendar size={18} className="text-blue-600" /> {data.booking_date} à {data.booking_time}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Client & Contact</span>
                                                    <span className="font-bold text-slate-900 text-lg truncate">
                                                        {data.client_name} ({data.client_phone})
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Lieu d'intervention</span>
                                                    <span className="font-bold text-slate-900 text-lg">
                                                        {data.city}, {data.client_address.substring(0, 30)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-200">
                                            <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                                                <FileText size={14} className="text-blue-600" /> Remarques (Optionnel)
                                            </label>
                                            <textarea 
                                                rows="2"
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                                placeholder="Instructions particulières pour le technicien..."
                                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <p className="text-sm font-medium text-blue-900 leading-relaxed">
                                            En confirmant, vous acceptez que notre équipe vous contacte par téléphone ou WhatsApp pour finaliser l'intervention.
                                        </p>
                                    </div>

                                    <div className="mt-16 flex justify-between">
                                        <button 
                                            type="button" 
                                            onClick={prevStep}
                                            className="px-8 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center gap-2"
                                        >
                                            <ArrowLeft size={20} /> Retour
                                        </button>
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-900/10 transition-all flex items-center gap-3 relative overflow-hidden"
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> Envoi...
                                                </span>
                                            ) : (
                                                <>Confirmer la Réservation <ArrowRight size={20} /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    </PublicLayout>
    )
}
