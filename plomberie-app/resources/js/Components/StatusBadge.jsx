export function StatusBadge({ status, className }) {
    const configs = {
        pending: {
            bg: 'bg-amber-100/60',
            text: 'text-amber-700',
            dot: 'bg-amber-500',
            label: 'En attente'
        },
        confirmed: {
            bg: 'bg-blue-100/60',
            text: 'text-blue-700',
            dot: 'bg-blue-500',
            label: 'Réservée'
        },
        in_progress: {
            bg: 'bg-indigo-100/60',
            text: 'text-indigo-700',
            dot: 'bg-indigo-500',
            label: 'En cours'
        },
        completed: {
            bg: 'bg-emerald-100/60',
            text: 'text-emerald-700',
            dot: 'bg-emerald-500',
            label: 'Terminée'
        },
        cancelled: {
            bg: 'bg-rose-100/60',
            text: 'text-rose-700',
            dot: 'bg-rose-500',
            label: 'Annulée'
        }
    }

    const config = configs[status] || configs.pending

    return (
        <span className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
            ${config.bg} ${config.text} ${className}
        `}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shadow-[0_0_8px] shadow-current`}></span>
            {config.label}
        </span>
    )
}
