export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-[13px] font-bold text-slate-700 tracking-wide mb-1.5 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
