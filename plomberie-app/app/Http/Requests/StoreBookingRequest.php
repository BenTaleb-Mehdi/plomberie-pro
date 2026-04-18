<?php

namespace App\Http\Requests;

use App\Rules\NotSunday;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route publique
    }

    public function rules(): array
    {
        return [
            'service_type_id' => [
                'required', 'integer',
                Rule::exists('service_types', 'id')->where('is_active', true)
            ],
            'booking_date'    => ['required', 'date', 'after:today', new NotSunday()],
            'booking_time'    => [
                'required',
                Rule::in(['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'])
            ],
            'client_name'     => ['required', 'string', 'min:3', 'max:100'],
            'client_phone'    => ['required', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'client_email'    => ['required', 'email:rfc', 'max:255'],
            'client_address'  => ['required', 'string', 'min:10', 'max:500'],
            'city'            => [
                'required',
                Rule::in([
                    'Tanger', 'Tétouan', 'Al Hoceïma', 'Larache',
                    'Chefchaouen', 'Mdiq', 'Fnideq', 'Martil', 'Asilah',
                ])
            ],
            'notes'           => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_type_id.required' => 'Veuillez choisir un type de service.',
            'booking_date.after'       => 'La date doit être après aujourd\'hui.',
            'booking_date.required'    => 'La date de réservation est requise.',
            'booking_time.required'    => 'Veuillez choisir un créneau horaire.',
            'booking_time.in'          => 'Créneau horaire invalide.',
            'client_name.required'     => 'Votre nom complet est requis.',
            'client_phone.required'    => 'Votre numéro de téléphone est requis.',
            'client_phone.regex'       => 'Format invalide. Exemple: 0612345678',
            'client_email.required'    => 'Votre adresse email est requise.',
            'client_email.email'       => 'Adresse email invalide.',
            'client_address.required'  => 'Votre adresse est requise.',
            'city.required'            => 'Veuillez choisir votre ville.',
            'city.in'                  => 'Désolé, votre ville n\'est pas encore couverte.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'client_name'    => trim($this->client_name ?? ''),
            'client_phone'   => preg_replace('/[\s\-\.]/', '', $this->client_phone ?? ''),
            'client_email'   => strtolower(trim($this->client_email ?? '')),
            'client_address' => trim($this->client_address ?? ''),
        ]);
    }
}
