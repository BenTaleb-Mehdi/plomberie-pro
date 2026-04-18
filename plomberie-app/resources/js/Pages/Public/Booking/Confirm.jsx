import { Head, Link } from '@inertiajs/react'
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, ArrowRight, Share2 } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import { ConfirmationCode } from '@/Components/Booking/ConfirmationCode'

export default function BookingConfirm({ booking }) {
    const nextSteps = [
        { icon: Phone,    text: 'Notre équipe vous appellera dans les 24h pour confirmer.', delay: 'delay-100' },
        { icon: Calendar, text: 'Le technicien se présentera à l\'heure convenue.',   delay: 'delay-200' },
        { icon: CheckCircle, text: 'Le devis sera remis sur place avant toute intervention.', delay: 'delay-300' },
    ]

    return (
        <PublicLayout>
            <Head title="Réservation Envoyée — Plomberie Pro" />
            
            <div className="min-h-screen bg-slate-50 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>

                <div className="max-w-xl mx-auto px-4 relative z-10 text-center">

                    <div className="mb-12 relative inline-block">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto border-4 border-emerald-50 text-emerald-600 animate-in zoom-in duration-500">
                            <CheckCircle size={48} strokeWidth={2.5} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500">
                        Demande Envoyée !
                    </h1>
                    <p className="text-slate-500 font-medium mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                        Votre demande d'intervention a été enregistrée. Voici votre code de référence pour le suivi :
                    </p>

                    <div className="animate-in fade-in zoom-in-95 duration-700 delay-300">
                        <ConfirmationCode code={booking.confirmation_code} />
                    </div>

                    {/* Quick Summary Card */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 mt-12 text-left shadow-2xl shadow-slate-900/5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-50 pb-4">Récapitulatif Express</h3>
                        
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 text-slate-700">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <Calendar size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Rendez-vous</p>
                                    <span className="font-bold">{booking.booking_date} à {booking.booking_time}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-slate-700">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Lieu</p>
                                    <span className="font-bold">{booking.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-16 text-left">
                        <h2 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Prochaines étapes de votre intervention</h2>
                        <div className="space-y-6 relative">
                            <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-100 hidden sm:block"></div>
                            
                            {nextSteps.map(({ icon: Icon, text, delay }, i) => (
                                <div key={i} className={`flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-700 ${delay}`}>
                                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10 transition-transform hover:scale-110">
                                        <Icon size={20} className="text-blue-600" />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-slate-700 font-bold leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                        <Link href={route('home')}
                            className="w-full sm:flex-1 px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
                            Retour à l'accueil <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-5 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                            <Share2 size={18} /> Partager
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                        <Mail size={14} /> Un email de confirmation a également été envoyé.
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
