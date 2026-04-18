import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export function FlashMessage() {
    const { flash } = usePage().props
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState(null)
    const [type, setType] = useState('success')

    useEffect(() => {
        if (flash.success || flash.error) {
            setMessage(flash.success || flash.error)
            setType(flash.success ? 'success' : 'error')
            setIsVisible(true)

            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [flash])

    if (!isVisible) return null

    return (
        <div className="fixed top-24 right-4 z-[100] animate-in fade-in slide-in-from-right-4 duration-300">
            <div className={`
                flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border-2 min-w-[320px] max-w-md
                ${type === 'success' 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800 shadow-emerald-900/10' 
                    : 'bg-rose-50 border-rose-100 text-rose-800 shadow-rose-900/10'
                }
            `}>
                <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}
                `}>
                    {type === 'success' 
                        ? <CheckCircle size={22} className="text-emerald-600" />
                        : <XCircle size={22} className="text-rose-600" />
                    }
                </div>
                
                <div className="flex-1 mr-2">
                    <p className="text-sm font-bold leading-tight">
                        {type === 'success' ? 'Succès !' : 'Erreur'}
                    </p>
                    <p className="text-xs font-medium mt-0.5 opacity-90">{message}</p>
                </div>

                <button 
                    onClick={() => setIsVisible(false)}
                    className={`
                        p-1.5 rounded-lg transition-colors
                        ${type === 'success' ? 'hover:bg-emerald-200/50' : 'hover:bg-rose-200/50'}
                    `}
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}
