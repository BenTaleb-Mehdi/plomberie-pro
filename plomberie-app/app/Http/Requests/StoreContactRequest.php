<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Formulaire de contact public
    }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'min:3', 'max:100'],
            'email'   => ['required', 'email:rfc', 'max:255'],
            'phone'   => ['nullable', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'subject' => ['required', 'string', 'min:5', 'max:200'],
            'message' => ['required', 'string', 'min:20', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'    => 'Votre nom est requis.',
            'email.required'   => 'Votre adresse email est requise.',
            'phone.regex'      => 'Format de téléphone invalide.',
            'subject.required' => 'Le sujet est requis.',
            'message.required' => 'Le message est requis.',
            'message.min'      => 'Le message doit faire au moins 20 caractères.',
        ];
    }
}
