import { Check } from 'lucide-react'

export function StepIndicator({ currentStep }) {
    const steps = [
        { id: 1, name: 'Service', description: 'Choisissez votre besoin' },
        { id: 2, name: 'Détails', description: 'Date, lieu et contact' },
        { id: 3, name: 'Confirmer', description: 'Vérification finale' },
    ]

    return (
        <div className="relative py-12 px-4 sm:px-0">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full px-12 sm:px-24">
                <div 
                    className="h-full bg-blue-600 transition-all duration-700 shadow-lg shadow-blue-200" 
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
            </div>

            <div className="relative z-10 flex justify-between gap-4 max-w-2xl mx-auto">
                {steps.map((step) => {
                    const isCompleted = currentStep > step.id
                    const isActive    = currentStep === step.id
                    const isUpcoming  = currentStep < step.id

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500
                                ${isCompleted ? 'bg-blue-600 text-white rotate-[360deg]' : ''}
                                ${isActive ? 'bg-white text-blue-600 border-4 border-blue-600 shadow-2xl scale-125' : ''}
                                ${isUpcoming ? 'bg-slate-50 text-slate-400 border-2 border-slate-200 border-dashed' : ''}
                            `}>
                                {isCompleted ? <Check size={24} strokeWidth={4} /> : step.id}
                            </div>
                            <div className="mt-4 text-center">
                                <p className={`text-xs font-black uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                                    {step.name}
                                </p>
                                <p className={`hidden sm:block text-[10px] font-bold mt-0.5 ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
