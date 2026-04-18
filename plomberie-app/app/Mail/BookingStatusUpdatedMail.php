<?php

namespace App\Mail;

use App\Enums\BookingStatus;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingStatusUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Booking $booking,
        public readonly BookingStatus $oldStatus,
        public readonly BookingStatus $newStatus
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Mise à jour de votre réservation #{$this->booking->confirmation_code}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking.status-updated',
            with: [
                'booking'          => $this->booking,
                'confirmationCode' => $this->booking->confirmation_code,
                'newStatusLabel'   => $this->newStatus->label(),
                'newStatusColor'   => $this->newStatus->color(),
            ],
        );
    }
}
