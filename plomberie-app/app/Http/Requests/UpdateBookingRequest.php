<?php

namespace App\Http\Requests;

use App\Enums\BookingStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        return [
            'client_name'   => ['sometimes', 'required', 'string', 'max:255'],
            'client_phone'  => ['sometimes', 'required', 'string', 'max:20'],
            'booking_date'  => ['sometimes', 'required', 'date'],
            'booking_time'  => ['sometimes', 'required', 'string'],
            'service_type_id' => ['sometimes', 'required', 'exists:service_types,id'],
            'status'        => ['required', Rule::enum(BookingStatus::class)],
            'technician_id' => ['nullable', 'integer', 'exists:technicians,id'],
            'admin_notes'   => ['nullable', 'string', 'max:1000'],
        ];
    }
}
