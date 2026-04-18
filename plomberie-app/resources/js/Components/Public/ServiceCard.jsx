import { Droplets, Clock, ArrowRight } from 'lucide-react'
import { Link } from '@inertiajs/react'

export function ServiceCard({ service }) {
    const renderImage = () => {
        if (service.image_url) return service.image_url;
        
        // Dynamically fetch a beautiful architectural/plumbing image based on the service name
        const searchQuery = encodeURIComponent(service.name || 'plumbing');
        return `https://source.unsplash.com/featured/800x600/?${searchQuery},bathroom,water`;
    };

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] border border-slate-100 h-full flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer">
            {/* Top Image Section */}
            <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img 
                    src={renderImage()} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 shadow-lg">
                    <Droplets size={20} />
                </div>
                
                {/* Title inside image */}
                <h3 className="absolute bottom-5 left-6 right-8 text-xl font-black text-white tracking-tight leading-snug">{service.name}</h3>
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-3">
                    {service.description || "Expertise professionnelle et dépannage garanti par nos techniciens certifiés."}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={16} className="text-blue-500" /> 
                        {service.duration_minutes ? `${service.duration_minutes} min` : 'Intervention'}
                    </span>
                    <Link 
                        href={route('booking.create', { service_id: service.id })}
                        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 group-hover:text-blue-700 transition-colors"
                    >
                        Réserver <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
