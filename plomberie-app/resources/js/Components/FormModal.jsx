import { Fragment } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';

export default function FormModal({
    show,
    onClose,
    title,
    children,
    maxWidth = '2xl',
    footer,
}) {
    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[100]"
                onClose={onClose}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-400"
                            enterFrom="opacity-0 scale-95 translate-y-8"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-8"
                        >
                            <DialogPanel className={`w-full ${maxWidthClass} transform overflow-hidden rounded-[3.5rem] bg-white p-10 text-left align-middle shadow-[0_32px_80px_rgba(0,0,0,0.1)] transition-all border border-slate-100 relative group`}>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                                            {title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-10 bg-blue-600 rounded-full"></div>
                                            <div className="h-1.5 w-1.5 bg-blue-100 rounded-full"></div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {children}
                                </div>

                                {/* Footer */}
                                {footer && (
                                    <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-end gap-4">
                                        {footer}
                                    </div>
                                )}

                                {/* Decorative Element */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #F1F5F9; border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E2E8F0; }
                `}} />
            </Dialog>
        </Transition>
    );
}
