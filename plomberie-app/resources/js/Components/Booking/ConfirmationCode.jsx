import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function ConfirmationCode({ code }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group max-w-sm mx-auto">
            <div className={`
                absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 
                transition duration-1000 group-hover:opacity-40 group-hover:duration-200
            `}></div>
            <div className="relative flex items-center justify-between gap-4 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-blue-900/5">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">Référence</span>
                    <span className="text-2xl font-black text-slate-800 tracking-wider mono uppercase">{code}</span>
                </div>
                
                <button 
                    onClick={handleCopy}
                    className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${copied ? 'bg-emerald-600 text-white scale-110' : 'bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600'}
                    `}
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
            </div>
            
            {copied && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    Copié !
                </div>
            )}
        </div>
    )
}
