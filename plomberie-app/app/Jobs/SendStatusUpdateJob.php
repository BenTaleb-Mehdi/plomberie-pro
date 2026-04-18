<?php

namespace App\Jobs;

use App\Enums\BookingStatus;
use App\Mail\BookingStatusUpdatedMail;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendStatusUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(
        public readonly Booking $booking,
        public readonly BookingStatus $oldStatus,
        public readonly BookingStatus $newStatus
    ) {}

    public function handle(): void
    {
        Mail::to($this->booking->client_email)
            ->send(new BookingStatusUpdatedMail($this->booking, $this->oldStatus, $this->newStatus));
    }
}
