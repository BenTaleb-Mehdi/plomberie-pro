import { Fragment } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';
import { AlertCircle, Trash2, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function ConfirmationModal({
    show,
    onClose,
    onConfirm,
    title = 'Êtes-vous sûr ?',
    message = 'Cette action est irréversible et pourrait affecter d\'autres données.',
    confirmText = 'Confirmer',
    cancelText = 'Annuler',
    type = 'danger', // danger, warning, info
    processing = false,
}) {
    const icons = {
        danger: <Trash2 className="text-rose-600" size={32} />,
        warning: <AlertCircle className="text-amber-500" size={32} />,
        info: <AlertCircle className="text-blue-600" size={32} />,
    };

    const colors = {
        danger: 'bg-rose-50 text-rose-600 border-rose-100',
        warning: 'bg-amber-50 text-amber-600 border-amber-100',
        info: 'bg-blue-50 text-blue-600 border-blue-100',
    };

    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="relative z-[110]" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[3rem] bg-white p-10 text-center shadow-2xl transition-all border border-slate-100">
                                <div className={`mx-auto w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 border ${colors[type]}`}>
                                    {icons[type]}
                                </div>

                                <Dialog.Title as="h3" className="text-2xl font-black text-slate-900 tracking-tighter mb-4">
                                    {title}
                                </Dialog.Title>
                                
                                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-10">
                                    {message}
                                </p>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={onConfirm}
                                        disabled={processing}
                                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all
                                            ${type === 'danger' ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-xl shadow-rose-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200'}
                                            ${processing && 'opacity-50'}
                                        `}
                                    >
                                        {processing ? 'Chargement...' : confirmText}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        {cancelText}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
