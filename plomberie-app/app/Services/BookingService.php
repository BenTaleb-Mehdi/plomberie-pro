<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Jobs\SendBookingConfirmationJob;
use App\Jobs\SendStatusUpdateJob;
use App\Models\Booking;

class BookingService
{
    /**
     * Créer une nouvelle réservation.
     */
    public function create(array $data): Booking
    {
        $booking = Booking::create(array_merge($data, [
            'status'            => BookingStatus::Pending->value,
            'confirmation_code' => $this->generateCode(),
        ]));

        // Enregistrer le changement de statut initial
        $this->logStatus($booking, BookingStatus::Pending, null, 'Réservation créée par le client');

        // Envoyer l'email de confirmation (async via queue)
        SendBookingConfirmationJob::dispatch($booking);

        return $booking;
    }

    /**
     * Mettre à jour le statut d'une réservation.
     */
    public function updateStatus(
        Booking $booking,
        BookingStatus $newStatus,
        int $changedById,
        ?string $notes = null
    ): Booking {
        $oldStatus = $booking->status;

        $booking->update(['status' => $newStatus->value]);
        $this->logStatus($booking, $newStatus, $changedById, $notes);

        // Notifier le client si statut important
        if (in_array($newStatus, [BookingStatus::Confirmed, BookingStatus::Cancelled])) {
            SendStatusUpdateJob::dispatch($booking, $oldStatus, $newStatus);
        }

        return $booking->fresh();
    }

    /**
     * Assigner un technicien à une réservation.
     */
    public function assignTechnician(Booking $booking, int $technicianId): Booking
    {
        $booking->update(['technician_id' => $technicianId]);
        return $booking->fresh(['technician']);
    }

    /**
     * Générer un code de confirmation unique.
     */
    private function generateCode(): string
    {
        do {
            $code = 'PLB-' . strtoupper(substr(uniqid('', true), -6));
        } while (Booking::where('confirmation_code', $code)->exists());

        return $code;
    }

    /**
     * Enregistrer un changement de statut dans l'historique.
     */
    private function logStatus(
        Booking $booking,
        BookingStatus $status,
        ?int $changedBy = null,
        ?string $note = null
    ): void {
        $booking->statusLogs()->create([
            'status'     => $status->value,
            'changed_by' => $changedBy,
            'note'       => $note,
        ]);
    }
}
