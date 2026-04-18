import { Link } from '@inertiajs/react'
import { Droplets } from 'lucide-react'

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">

            {/* Subtle background accent */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[140px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="w-full max-w-[420px] relative z-10">

                {/* Brand */}
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-shadow">
                            <Droplets size={22} className="text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Tanger Plomberie</h1>
                            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 mt-0.5">Console de gestion</p>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm shadow-gray-200/60">
                    {children}
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Tanger Plomberie — Tous droits réservés
                </p>
            </div>
        </div>
    )
}
