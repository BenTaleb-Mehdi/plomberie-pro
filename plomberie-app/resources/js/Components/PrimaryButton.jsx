export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-3 text-[13px] font-bold tracking-wide text-white transition-all duration-300 hover:bg-blue-500 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:hover:scale-100 disabled:hover:translate-y-0 ${
                    disabled && 'opacity-50 cursor-not-allowed shadow-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
