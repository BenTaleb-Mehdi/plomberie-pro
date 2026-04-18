import { useState, useRef } from 'react'
import { Upload, X, FileImage, Image as ImageIcon, Camera } from 'lucide-react'

export default function FileDropzone({ 
    label, 
    value, 
    onChange, 
    placeholder = "Glissez-déposez une image ici",
    multiple = false,
    className = ""
}) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            handleFiles(files)
        }
    }

    const handleFiles = (files) => {
        if (multiple) {
            const newFiles = Array.from(files)
            onChange([...value, ...newFiles])
        } else {
            onChange(files[0])
        }
    }

    const removeFile = (index) => {
        if (multiple) {
            const newValue = value.filter((_, i) => i !== index)
            onChange(newValue)
        } else {
            onChange(null)
        }
    }

    const triggerInput = () => fileInputRef.current.click()

    // Helper to get preview URL
    const getPreview = (file) => {
        if (typeof file === 'string') return file
        return URL.createObjectURL(file)
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {label && (
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {label}
                </label>
            )}

            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerInput}
                className={`
                    relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center
                    ${isDragging 
                        ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10' 
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400'
                    }
                    ${multiple ? 'py-10' : 'aspect-video w-full'}
                `}
            >
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    multiple={multiple}
                    accept="image/*"
                />

                {!multiple && value ? (
                    <div className="absolute inset-2 rounded-[2rem] overflow-hidden group/img">
                        <img src={getPreview(value)} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-4 bg-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest border border-white/20">
                                Changer l'image
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center px-10">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-inner
                            ${isDragging ? 'bg-blue-600 text-white' : 'bg-white text-slate-300'}`}>
                            {multiple ? <Camera size={32} /> : <Upload size={32} />}
                        </div>
                        <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-2">{placeholder}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {multiple ? 'Ajoutez plusieurs clichés' : "SVG, PNG, JPG (MAX. 5MB)"}
                        </p>
                    </div>
                )}
            </div>

            {multiple && value && value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
                    {value.map((file, i) => (
                        <div key={i} className="relative aspect-square rounded-3xl border border-slate-100 overflow-hidden group">
                            <img src={getPreview(file)} className="w-full h-full object-cover" />
                            <button 
                                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                className="absolute top-2 right-2 w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-lg"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
