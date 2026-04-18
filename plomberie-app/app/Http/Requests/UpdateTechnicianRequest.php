<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTechnicianRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $technician = $this->route('technician');
        $userId = $technician->user_id;

        return [
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255|unique:users,email,' . $userId,
            'password'      => 'nullable|string|min:8|confirmed',
            'phone'         => 'nullable|string|max:20',
            'specialty'     => 'required|string|max:100',
            'zone'          => 'required|string|max:100',
            'bio'           => 'nullable|string',
            'is_available'  => 'boolean',
        ];
    }
}
