import { Head, useForm } from '@inertiajs/react'
import { Phone, Mail, MapPin, Send, MessageSquare, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'
import BlurText from '@/Components/ReactBits/BlurText'
import SpotlightCard from '@/Components/ReactBits/SpotlightCard'
import ShinyText from '@/Components/ReactBits/ShinyText'

export default function Contact() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('contact.store'), {
            onSuccess: () => reset(),
        })
    }

    const contactInfo = [
        { icon: Phone, label: 'Téléphone & WhatsApp', value: '+212 6XX XXX XXX', color: 'bg-emerald-50 text-emerald-600' },
        { icon: Mail, label: 'Email Support', value: 'contact@plomberiepro.ma', color: 'bg-blue-50 text-blue-600' },
        { icon: MapPin, label: 'Siège Social', value: 'Boulevard Mohammed V, Tanger', color: 'bg-indigo-50 text-indigo-600' },
    ]

    return (
        <PublicLayout>
            <Head title="Contactez-nous — Plomberie Pro Maroc" />

            <div className="bg-white min-h-screen pt-24 pb-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        
                        {/* LEFT: Info & Title */}
                        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                            <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">À votre écoute</p>
                            <BlurText 
                                text="Parlons de votre Projet"
                                className="text-4xl md:text-7xl font-black text-slate-900 leading-none mb-8 tracking-tighter"
                                delay={100}
                            />
                            <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-md">
                                Une question ? Un devis spécifique ? Notre équipe commerciale 
                                vous répond sous 2 heures ouvrables.
                            </p>

                            <div className="space-y-8">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex items-center gap-4 group transition-transform hover:translate-x-1">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 ${info.color}`}>
                                            <info.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{info.label}</p>
                                            <p className="text-lg font-bold text-slate-800">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Clock size={16} className="text-blue-600" /> Horaires d'ouverture
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600 font-medium">
                                    <li className="flex justify-between"><span>Lundi - Vendredi</span> <span className="font-bold">08:00 - 18:00</span></li>
                                    <li className="flex justify-between"><span>Samedi</span> <span className="font-bold">09:00 - 16:00</span></li>
                                    <li className="flex justify-between text-red-500"><span>Dimanche</span> <span className="font-bold uppercase tracking-widest text-[10px]">Fermé</span></li>
                                </ul>
                            </div>
                        </div>

        {/* RIGHT: Form */}
        <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <SpotlightCard className="rounded-[2.5rem] shadow-2xl shadow-slate-900/10 border border-slate-100">
                <div className="bg-white p-8 md:p-12 relative group h-full">
                    {recentlySuccessful ? (
                        <div className="text-center py-12 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4">Message Envoyé !</h3>
                            <p className="text-slate-500 font-medium max-w-xs mx-auto">
                                Merci pour votre message. Nous vous recontacterons très bientôt.
                            </p>
                            <button 
                                onClick={() => reset()}
                                className="mt-8 px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[10px]"
                            >
                                Envoyer un autre message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
                                        <ShinyText text="Nom Complet" />
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                        placeholder="Votre nom"
                                    />
                                    {errors.name && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
                                        <ShinyText text="Email" />
                                    </label>
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                        placeholder="votre@email.com"
                                    />
                                    {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
                                    <ShinyText text="Sujet" />
                                </label>
                                <input 
                                    type="text" 
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none"
                                    placeholder="De quoi s'agit-il ?"
                                />
                                {errors.subject && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
                                    <ShinyText text="Message" />
                                </label>
                                <textarea 
                                    rows="5"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] font-medium rounded-xl px-5 py-3.5 transition-all duration-300 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none resize-none"
                                    placeholder="Votre message ici..."
                                ></textarea>
                                {errors.message && <p className="mt-1 text-[10px] font-bold text-red-500">{errors.message}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full py-5 bg-blue-600 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 transition-all flex items-center justify-center gap-3 active:scale-95 overflow-hidden group/btn"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> <ShinyText text="Envoyer le message" disabled={false} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </SpotlightCard>

                            <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                <div className="flex items-center gap-2 font-black text-slate-400 text-xs tracking-widest"><ShieldCheck size={18} /> Données Sécurisées</div>
                                <div className="flex items-center gap-2 font-black text-slate-400 text-xs tracking-widest"><MessageSquare size={18} /> Réponse Rapide</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
