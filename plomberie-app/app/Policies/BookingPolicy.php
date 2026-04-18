<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookingPolicy
{
    /**
     * Voir une réservation.
     */
    public function view(User $user, Booking $booking): bool
    {
        if ($user->hasRole('admin')) return true;

        if ($user->hasRole('technician')) {
            return $booking->technician?->user_id === $user->id;
        }

        return $booking->client_email === $user->email;
    }

    /**
     * Modifier le statut d'une réservation.
     */
    public function updateStatus(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Annuler une réservation (client ou admin).
     */
    public function cancel(User $user, Booking $booking): bool
    {
        if ($booking->status->value !== 'pending') return false;
        if ($user->hasRole('admin')) return true;
        return $booking->client_email === $user->email;
    }

    /**
     * Supprimer une réservation (admin seulement).
     */
    public function delete(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }
}
