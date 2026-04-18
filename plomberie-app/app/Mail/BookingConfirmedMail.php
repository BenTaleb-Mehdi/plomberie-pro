<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Booking $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Confirmation de réservation #{$this->booking->confirmation_code}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking.confirmed',
            with: [
                'booking'          => $this->booking,
                'confirmationCode' => $this->booking->confirmation_code,
                'serviceType'      => $this->booking->serviceType->name,
                'bookingDate'      => \Illuminate\Support\Carbon::parse($this->booking->booking_date)->format('d/m/Y'),
                'bookingTime'      => $this->booking->booking_time,
            ],
        );
    }
}
