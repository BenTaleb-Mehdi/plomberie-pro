export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-[13px] font-bold tracking-wide text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 shadow-sm hover:shadow-md active:scale-[0.98] disabled:hover:scale-100 disabled:hover:translate-y-0 ${
                    disabled && 'opacity-50 cursor-not-allowed shadow-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
