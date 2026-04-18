# SKILL FILE: React.js + Inertia.js
# PlomberieDevAgent — Skills Layer

---

## SKILL: Page Component Template

Every Inertia page component follows this structure:

```jsx
// resources/js/Pages/Public/Booking/Create.jsx

import { useState } from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import { Wrench, ChevronRight, ChevronLeft } from 'lucide-react'
import PublicLayout from '@/Layouts/PublicLayout'

// ── Page reçoit ses données depuis le contrôleur Laravel ─────────
export default function BookingCreate({ serviceTypes, cities }) {
    const [currentStep, setCurrentStep] = useState(1)

    const { data, setData, post, processing, errors, reset } = useForm({
        service_type_id: '',
        booking_date:    '',
        booking_time:    '',
        client_name:     '',
        client_phone:    '',
        client_email:    '',
        client_address:  '',
        city:            '',
        notes:           '',
    })

    const steps = [
        { label: 'Choisir un service' },
        { label: 'Planifier'          },
        { label: 'Confirmer'          },
    ]

    const nextStep = () => setCurrentStep(s => Math.min(s + 1, 3))
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1))

    const submit = (e) => {
        e.preventDefault()
        post(route('booking.store'))
    }

    return (
        <PublicLayout>
            <Head title="Réserver un service" />

            <div className="min-h-screen bg-slate-50 py-12">
                <div className="max-w-2xl mx-auto px-4">

                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Réserver une intervention
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Remplissez le formulaire — un technicien vous contactera
                        </p>
                    </div>

                    {/* Indicateur d'étapes */}
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    {/* Formulaire */}
                    <form onSubmit={submit}>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mt-6">

                            {currentStep === 1 && (
                                <StepService
                                    serviceTypes={serviceTypes}
                                    selected={data.service_type_id}
                                    onSelect={(id) => setData('service_type_id', id)}
                                    error={errors.service_type_id}
                                />
                            )}

                            {currentStep === 2 && (
                                <StepSchedule
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    cities={cities}
                                />
                            )}

                            {currentStep === 3 && (
                                <StepReview
                                    data={data}
                                    serviceTypes={serviceTypes}
                                />
                            )}

                        </div>

                        {/* Navigation entre étapes */}
                        <div className="flex justify-between mt-6">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                    Retour
                                </button>
                            ) : <div />}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!canProceed(currentStep, data)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Suivant
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Envoi en cours...' : 'Confirmer la réservation'}
                                </button>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        </PublicLayout>
    )
}

// ── Valider si on peut passer à l'étape suivante ─────────────────
function canProceed(step, data) {
    if (step === 1) return !!data.service_type_id
    if (step === 2) return !!(data.booking_date && data.booking_time && data.client_name && data.client_phone && data.client_email && data.client_address && data.city)
    return true
}
```

---

## SKILL: Step Indicator Component

```jsx
// resources/js/Components/Booking/StepIndicator.jsx

import { Check } from 'lucide-react'

export function StepIndicator({ steps, currentStep }) {
    return (
        <div className="flex items-center justify-center">
            {steps.map((step, i) => {
                const stepNum   = i + 1
                const isDone    = stepNum < currentStep
                const isActive  = stepNum === currentStep

                return (
                    <div key={i} className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div className={`
                                w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                ${isDone   ? 'bg-green-500 text-white' : ''}
                                ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                                ${!isDone && !isActive ? 'bg-slate-200 text-slate-400' : ''}
                            `}>
                                {isDone ? <Check size={16} /> : stepNum}
                            </div>
                            <span className={`
                                hidden sm:block text-sm font-medium
                                ${isActive ? 'text-blue-600' : 'text-slate-400'}
                            `}>
                                {step.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`
                                h-0.5 w-8 md:w-16 mx-3 transition-all
                                ${isDone ? 'bg-green-500' : 'bg-slate-200'}
                            `} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
```

---

## SKILL: Admin Table Component

```jsx
// resources/js/Components/Admin/BookingsTable.jsx

import { Link } from '@inertiajs/react'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/Components/StatusBadge'

export function BookingsTable({ bookings }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {['Code', 'Client', 'Service', 'Date', 'Ville', 'Statut', 'Technicien', 'Actions'].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                    {bookings.data.map(booking => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                                <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                                    {booking.confirmation_code}
                                </code>
                            </td>
                            <td className="px-4 py-3">
                                <div className="font-medium text-slate-900 text-sm">{booking.client_name}</div>
                                <div className="text-slate-500 text-xs">{booking.client_phone}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                                {booking.service_type?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                                <div>{booking.booking_date}</div>
                                <div className="text-slate-500 text-xs">{booking.booking_time}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">{booking.city}</td>
                            <td className="px-4 py-3">
                                <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-500">
                                {booking.technician?.user?.name ?? (
                                    <span className="text-amber-600 text-xs">Non assigné</span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                    <Link
                                        href={route('admin.bookings.show', booking.id)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                    <Link
                                        href={route('admin.bookings.edit', booking.id)}
                                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {bookings.data.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    Aucune réservation trouvée.
                </div>
            )}
        </div>
    )
}
```

---

## SKILL: Flash Message Hook

```jsx
// resources/js/hooks/useFlash.js

import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export function useFlash() {
    const { flash } = usePage().props
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (flash.success || flash.error) {
            setVisible(true)
            const timer = setTimeout(() => setVisible(false), 4000)
            return () => clearTimeout(timer)
        }
    }, [flash])

    return { flash, visible }
}
```

```jsx
// Usage dans un layout
import { useFlash } from '@/hooks/useFlash'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

function FlashMessage() {
    const { flash, visible } = useFlash()
    if (!visible) return null

    const isSuccess = !!flash.success
    return (
        <div className={`
            fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border max-w-sm
            ${isSuccess ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}
        `}>
            {isSuccess
                ? <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                : <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
            }
            <p className="text-sm font-medium">{flash.success ?? flash.error}</p>
        </div>
    )
}
```

---

## SKILL: Inertia Pagination Component

```jsx
// resources/js/Components/Pagination.jsx

import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ links }) {
    if (links.length <= 3) return null

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            {links.map((link, i) => {
                if (link.label === '&laquo; Previous') {
                    return (
                        <Link key={i} href={link.url ?? '#'}
                            className={`p-2 rounded-lg border transition-colors ${
                                link.url ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                         : 'border-slate-100 text-slate-300 cursor-not-allowed'
                            }`}
                        >
                            <ChevronLeft size={16} />
                        </Link>
                    )
                }
                if (link.label === 'Next &raquo;') {
                    return (
                        <Link key={i} href={link.url ?? '#'}
                            className={`p-2 rounded-lg border transition-colors ${
                                link.url ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                         : 'border-slate-100 text-slate-300 cursor-not-allowed'
                            }`}
                        >
                            <ChevronRight size={16} />
                        </Link>
                    )
                }
                return (
                    <Link key={i} href={link.url ?? '#'}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            })}
        </div>
    )
}
```

---

## SKILL: Confirmation Code Display

```jsx
// resources/js/Components/Booking/ConfirmationCode.jsx

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function ConfirmationCode({ code }) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-center gap-3 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <span className="text-2xl md:text-3xl font-mono font-bold text-blue-700 tracking-widest">
                {code}
            </span>
            <button
                onClick={copyToClipboard}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                title="Copier le code"
            >
                {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
            </button>
        </div>
    )
}
```
