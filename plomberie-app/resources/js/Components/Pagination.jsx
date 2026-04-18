import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ links }) {
    if (links.length <= 3) return null

    return (
        <nav className="flex items-center gap-1 mt-8">
            {links.map((link, i) => {
                const isFirst = i === 0
                const isLast  = i === links.length - 1
                
                return (
                    <Link
                        key={i}
                        href={link.url || '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`
                            px-4 py-2 border rounded-xl text-sm font-bold transition-all
                            ${!link.url ? 'text-slate-300 pointer-events-none cursor-default border-transparent' : ''}
                            ${link.active 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/20' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600'
                            }
                            ${(isFirst || isLast) ? 'px-3' : ''}
                        `}
                    />
                )
            })}
        </nav>
    )
}
